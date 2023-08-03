import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import homeImg from "../assets/home.jpg"
import Movielogo from "../assets/homeTitle.webp"
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

const Netflix = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    //for genres in stores
    const genresLoaded= useSelector((state)=>state.netflix.genresLoaded)
    //for fetching movies
    const movies = useSelector((state)=>state.netflix.movies);

    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(getGenres())
    },[])

    useEffect(()=>{
        if(genresLoaded) dispatch(fetchMovies({type:"all"}))    //movies type define
    },[genresLoaded])

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    }
  
   // console.log(movies);
    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                 <img src={homeImg} alt="hero_banner" className="homeImage"/>
                 <div className="container">
                 <div className="logo">
                 <img src={Movielogo} alt="movie-logo"/>
                 </div>
                 <div className="buttons flex">
                 <button className="flex j-center a-center" onClick={()=>navigate("/player")}><FaPlay />Play</button>
                 <button className="flex j-center a-center"><AiOutlineInfoCircle />More Info</button>
                 </div>
                 </div>
            </div>
            <Slider movies={movies} />
        </Container>
    )

}

const Container = styled.div`
background-color:black;
.hero{
    position:relative;
    .homeImage{
        filter : brightness(60%);
    }
    img{
        height:85vh;
        width:100vw;
    }
    .container{
        position:absolute;
        bottom:5rem;
        .logo{
            img{
                width:100%;
                height:100%;
                margin-left: 5rem;
            }
        }
        .buttons{
            margin: 5rem;
            gap:2rem;
            button{
                font-size:1.4rem;
                gap:1rem;
                margin-left: 1rem;
                border-radius:0.2rem;
                padding:0.5rem;
                padding-left:2rem;
                padding-right:2.4rem;
                border:none;
                cursor:pointer;
                transition:0.3s ease-in-out;
                &:hover{
                    opacity:0.8;
                }
                &:nth-of-type(2){
                    background-color: rgba(109,109,110,0.7);
                    color:white;
                    svg{
                        font-size:1.8rem;
                    }
                }
            }
        }   
    }
}
`;
export default Netflix