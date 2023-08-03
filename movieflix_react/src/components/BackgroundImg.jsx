import React from "react";
import BgImg from "../assets/login.jpg"
import { styled } from "styled-components";

const BackgroundImg=()=>{
  return(  <Container>
  <img src={BgImg} alt="Netflix"/>
  </Container>)
}

const Container =styled.div`
  height :100vh;
 width : 100vw;
`;
export default BackgroundImg