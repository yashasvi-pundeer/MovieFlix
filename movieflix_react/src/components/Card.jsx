import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import vedio from "../assets/S2.mp4"
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import {LOCALHOST_PATH} from "../utils/constants";
import { useDispatch } from "react-redux";
import { deleteUserLikedMovies, removeMovieFromLiked } from "../store";


const Card = ({ movieData, isLiked = false }) => {
  //console.log(movieData);
  const navigate =useNavigate();
  const dispatch = useDispatch();
    const [isHovered,setIsHovered]=useState(false);   //we have set the state if we will hover the what we have to do 
  
  //setting email so that we can use it with mongodb
  const [email,setEmail] = useState(undefined);
  onAuthStateChanged(firebaseAuth,(currentUser)=>{       
    if(currentUser) setEmail(currentUser.email);
    else navigate("/login");
})
  
//add to list function to add movies
const addToList = async()=>{
  try {
    await axios.post(LOCALHOST_PATH,{email,data:movieData})  //we have given the path where moviedata will be post along with email
  } catch (error) {
    console.log(error);
  }
}

    return (
        <Conatiner onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>  
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie image" />
            
            {/* if we will hover on the card we will play vedio and inhance the image of poster */ }
            
            {
                isHovered && (
                    <div className="hover">
                    <div className="image-video-container">
                    <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie image"
                    onClick={()=>navigate("/player")}
                    />
                    <video src={vedio} autoPlay loop muted 
                    onClick={()=>navigate("/player")}
                    ></video>
                    </div>

                    {/* here we will be creating data which we will show in card such as buttons and title and genres */}
                    <div className="info-container flex column">
                        <h3 className="name" onClick={() => navigate("/player")}> {movieData.name} </h3>
                                 <div className="icons flex j-between">
                                   <div className="controls flex">
                                <IoPlayCircleSharp
                                      title="Play"
                                      onClick={() => navigate("/player")}
                                    />
                                    {/* here we will create like disliked functionality */}
                                    <RiThumbUpFill title="Like" />
                                    <RiThumbDownFill title="Dislike" />
                                    {isLiked ? (
                                      <BsCheck
                                        title="Remove from List"
                                        onClick={() =>
                                          dispatch(
                                            removeMovieFromLiked({ movieId: movieData.id, email })
                                          )
                                        }
                                      />
                                    ) : (
                                      <AiOutlinePlus title="Add to my list" onClick={addToList} />
                                    )}
                                  </div>
                                  {/*here we will create box where we will show genre fetched from tmdb */}
                                  <div className="info">
                                    <BiChevronDown title="More Info" />
                                  </div>
                                </div>
                                <div className="genres flex">
                                  <ul className="flex">
                                    {movieData.genres.map((genre) => (
                                      <li>{genre}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                )
            }
        </Conatiner>
    )

}

const Conatiner = styled.div`
max-width: 230px;
width: 230px;
height: 100%;
cursor: pointer;
position: relative;
img {
  border-radius: 0.2rem;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.hover {
  z-index: 99;
  height: max-content;
  width: 20rem;
  position: absolute;
  top: -18vh;
  left: 0;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  background-color: #181818;
  transition: 0.3s ease-in-out;
  .image-video-container {
    position: relative;
    height: 140px;
    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 0.3rem;
      top: 0;
      z-index: 4;
      position: absolute;
    }
    video {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 0.3rem;
      top: 0;
      z-index: 5;
      position: absolute;
    }
  }
  .info-container {
    padding: 1rem;
    gap: 0.5rem;
  }
  .icons {
    .controls {
      display: flex;
      gap: 1rem;
    }
    svg {
      font-size: 2rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: #b8b8b8;
      }
    }
  }
  .genres {
    ul {
      gap: 1rem;
      li {
        padding-right: 0.7rem;
        &:first-of-type {
          list-style-type: none;
        }
      }
    }
  }
}
`
export default React.memo(Card);
