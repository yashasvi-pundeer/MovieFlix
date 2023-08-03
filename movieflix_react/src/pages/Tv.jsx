import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

const Tv =()=> {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies); //for fetching movies
  const genres = useSelector((state) => state.netflix.genres);  //for fetching genres name from movies
 const genresLoaded = useSelector((state) => state.netflix.genresLoaded); //for genres in stores

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []); //change 1


  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" })); //fetching data by genre where type movie
    }
  }, [genresLoaded]); //to refresh the comp we need to pass [genresloaded] array

//   const [user, setUser] = useState(undefined);

//to keep check on current state of user i.e signed in or not
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) setUser(currentUser.uid);
    // else navigate("/login");
  });

  //this is for fixing the navbar and changing its bg to black when we will scroll the screen
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
  
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
export default Tv;
