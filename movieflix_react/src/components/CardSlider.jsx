import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";


//we will be creating card slider functionality here

const CardSlider = ({ data, title }) => {

    const [sliderPosition,setSliderPosition] = useState(0);  //state to set initial position of slider to zero
    const [showControls,setShowControls]=useState(false);   // here we are setting state to show control of slider i.e on hover only
    const listRef = useRef()                               


    //this function is to make slider move...by handling its direction clicked and position
     const handleDirection =(direction)=>{
         let distance = listRef.current.getBoundingClientRect().x -70;

         if(direction === "left" && sliderPosition >0){
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
            setSliderPosition(sliderPosition-1);
         }
         if(direction === "right" && sliderPosition <4){
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setSliderPosition(sliderPosition+1);
         }
     }

    return (
        <Conatiner className="flex column"
        onMouseEnter={()=>setShowControls(true)}
        onMouseLeave={()=>setShowControls(false)}
        > 
        <h1>{title}</h1>
        <div className="wrapper">
        <div className={`slider-action left ${!showControls ? "none" : ""} flex a-center j-center`}>
        {/* here we have made div and set the direction to control the slider */}
        <AiOutlineLeft onClick={()=>handleDirection("left")} />
        </div>
        {/* here we have displayed movie using card component in between the slider  */}
        <div className="flex slider" ref={listRef}>
        {
            data.map((movie, index) => {
                return <Card movieData={movie} index={index} key={movie.id} />
            })
        }
     </div>
     <div className={`slider-action right ${!showControls ? "none" : ""} flex a-center j-center`}>
        <AiOutlineRight onClick={()=>handleDirection("right")} />
        </div>
        </div>
       
        </Conatiner>
    )

}
const Conatiner = styled.div`
gap:1rem;
position:relative;
padding:2rem 0;
h1{
    margin-left:50px;
}
.wrapper{
    .slider{
        width:max-content;
        gap:1rem;
        transform: translateX(0px);
        transition:0.3s ease-in-out;
        margin-left:50px;
    }
    .slider-action{
        position:absolute;
        z-index:99;
        height:100%;
        top:0;
        bottom:0;
        width:50px;
        transition:0.3s ease-in-out;
        svg{
            font-size: 2rem;
        }

    }
    .none{
        display:none;
    }
    .left{
        left:0;
    }
    .right{
        right:0;
    }

}
`

export default React.memo(CardSlider)