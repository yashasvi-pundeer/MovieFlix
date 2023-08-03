import React from "react";
import styled  from "styled-components";
import { useNavigate } from "react-router-dom";
import CardSlider from "./CardSlider";

const Slider=({movies})=>{
    const navigate= useNavigate();

    //we will me showing 10 movies in cardslider
    const getMoviesFromRange =(from,to)=>{
        return movies.slice(from,to);
    }

return(
    <Conatiner>
    <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
    <CardSlider title="New Realeases" data={getMoviesFromRange(10,20)}/>
    <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20,30)}/>
    <CardSlider title="Popular On Netflix" data={getMoviesFromRange(30,40)}/>
    <CardSlider title="Action Movies" data={getMoviesFromRange(40,50)}/>
    <CardSlider title="Sci-Fi Movies" data={getMoviesFromRange(50,60)}/>
    </Conatiner>
)

}

const Conatiner = styled.div`
`
export default React.memo(Slider)