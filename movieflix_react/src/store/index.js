import{
    configureStore,
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import { TMDB_BASE_URL,API_KEY } from "../utils/constants";
import axios from "axios";

//setting initial state
const initialState = {
    movies:[],
    genresLoaded:false,
    genres:[]
}


//this function will fetch all the genres from tmdb 
//furthur we will use these genres to create filter and idenify what?=>series,movies since we only have genre id in movies list
//here genres will be array of genre id and name

export const getGenres =createAsyncThunk("netflix/genres", async()=>{
    const {data:{genres}} = await axios.get (`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    // console.log(genres);                     
    return genres;
});

// this is sub helper function to fetch movies which creates an array in which  we have movie id,name or title, poster and top 3 genre for that movie
//we will run loop for every element in array and furthur we have sub loop for getting top 3 genre from array of genre and will push name of that genre using genre array and ids
//now finally if our movi will have poster only then it will be included in our array
/*  {
"adult": false,
"backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
"id": 502356,
"title": "The Super Mario Bros. Movie",
"original_language": "en",
"original_title": "The Super Mario Bros. Movie",
"overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
"poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
"media_type": "movie",
"genre_ids": [
16,
10751,
12,
14,
35
],
"popularity": 1119.076,
"release_date": "2023-04-05",
}, sample array element*/ 

const createArrayFromRawData=(array,moviesArray,genres)=>{
  //  console.log(array);
    array.forEach((movie)=>{
        const movieGenres =[];
        movie.genre_ids.forEach((genre)=>{
            const name = genres.find(({id})=>id===genre);
            if(name) movieGenres.push(name.name);
        })
        if(movie.backdrop_path){
            moviesArray.push({
                id: movie.id,
                name : movie?.original_name? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0,3),
            })
        }
    })

}

//this helper function takes 3 arguements api path, generes and paging parameter 
//paging will be used to get episodes of webseries not used for movies
//we will first create empty movie array then will add top 100 trending movies to it (hard bound so that we do not go in infinite loop) and i<10 to set min val of movies
//now we will fetch data according to each page and will store it in results
//results is object of movies/seeries data which we are getting from api
const getRawData = async(api,genres,paging)=>{
    const moviesArray =[];
    for(let i=1; moviesArray.length<100 && i<10;i++){
        const {data : {results}}= await axios.get(
            `${api}${paging ? `&page=${i}`:""}`);
        createArrayFromRawData(results,moviesArray,genres);
    }
    return moviesArray
}

//this function will fetch terending movies list
//here we have one helper function which will take the trending api link and genres and page number as arguments
//each page have 20 movies as object along with img of movie/series(backdrop_path) and array of genre ids
//here type it defines "all" ie movies and series both
export const fetchMovies =createAsyncThunk("netflix/trending", async({ type },thunkApI)=>{
    const {netflix:{genres}} = thunkApI.getState();
    //console.log(type);
    const data =  getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,    //$type->movies,all,webseries
        genres,
        true
    );
  //  console.log(data)
    return data;
   
});

//fetch data by genres for movies
export const fetchDataByGenre =createAsyncThunk("netflix/GetDataByGenre", async({ genre,type },thunkApI)=>{
    const {netflix:{genres}} = thunkApI.getState();
    //console.log(type);
    const data =  getRawData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,    //$type->movies,all,webseries
        genres
    );
  //  console.log(data)
    return data;
   
});

//user liked movies
export const getUserLikedMovies =createAsyncThunk("netflix/getLiked", async(email)=>{
    const {data:{movies}} = await axios.get(`http://localhost:8000/api/user/liked/${email}`);
    console.log(movies);
    return movies;

});
//delete user liked movies
export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:8000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );

//reducer and storage
const Netflixslice = createSlice({
    name:"netflix",
    initialState,
    extraReducers: (builder)=>{
        //adding cases to get movies genres
        builder.addCase(getGenres.fulfilled,(state,action)=>{
              state.genres=action.payload;
              state.genresLoaded=true;
        });
        //case for fetching movies
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
              state.movies=action.payload;
        });
        //case for fetching movies by genre
        builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
              state.movies=action.payload;
        });
        //case for getting user liked movies
        builder.addCase(getUserLikedMovies.fulfilled,(state,action)=>{
              state.movies=action.payload;
        });
        //case for deleting user liked movies
        builder.addCase(removeMovieFromLiked.fulfilled,(state,action)=>{
              state.movies=action.payload;
        });
    },
})

//setting storage
export const store =configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      }),
    reducer:{
        netflix : Netflixslice.reducer,
    }
})