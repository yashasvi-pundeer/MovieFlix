import React, { useState } from "react";
import styled from "styled-components"
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/Header";
import {firebaseAuth} from "../utils/firebase-config"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const SingnUp=()=>{
    const navigate = useNavigate();
   const [showpassword, setShowPassword ]=useState(false);
   const [formValues, setFormValues]= useState({
    email:"",
    password:"",
   });
  
   //handling signin
   const handleSignIn = async()=>{
    try{
       const {email,password}=formValues;
       await createUserWithEmailAndPassword(firebaseAuth,email,password);
    }catch(err){
          console.log(err);
    }
   }

onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
})

   return( 
    <Container showpassword={showpassword}>
    <BackgroundImg/>
    <div className="content">
    <Header login="true" />
    <div className="body flex column a-center j-center">
    <div className="text flex column">
    <h1>Unlimited movies, TV shows amd much more</h1>
    <h4>Watch anywhere , Cancel anytime</h4>
    <h6>
    Ready to watch? Enter your Email to create account or restart membership
    </h6>
    </div>
    <div className="form">
    <input type="email" placeholder="Enter your Email" name="email" value={formValues.email} onChange={(e)=>setFormValues({...formValues,
    [e.target.name]: e.target.value})
    }/>
    { showpassword &&
    <input type="password" placeholder="Enter your Password" name="password"value={formValues.password} onChange={(e)=>setFormValues({...formValues,
        [e.target.name]: e.target.value})
        }/>
     }
    {!showpassword && <button onClick={()=> setShowPassword(true)}>Get Started</button>}
    </div>
    <button onClick={handleSignIn}>SignUp</button>
    </div>
    </div>
    </Container>
   )
}

const Container = styled.div`
position: relative;
.content{
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.5);
    // border: 2px solid white;
    height:100vh;
    width:100vw;
    display:grid;
    grid-template-rows: 15vh 85vh;
}
.body{
    gap: 1rem;
}
.text{
    color: white;
    font-size: 2rem;
    text-align: center;
    gap: 1rem;
  }
  
  .text h1{
    padding: 0 25rem;
  }
  
  .flex{
    display: flex;
  }
  
  .column{
    flex-direction: column;
  }
  
  .a-center{
    align-items: center;
  }
  
  .j-center{
    justify-content: center;
  }
  .j-between{
    justify-content: space-between;
  }
  
  .form{
    display: grid;
    grid-template-columns:${({showpassword})=>showpassword?"1fr 1fr" : "2fr 1fr"} ;
    width: 60%;
  }
  .form input{
    color:black;
   // border: none;
    padding: 1.5rem;
    font-size: 1.3rem;
    border: 1px solid black;
  }
  .form input:focus{
    outline: none;
  }
  
  button{
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border:none;
    cursor:pointer;
    border-radius:0.2rem;
    color: white;
    font-weight:bolder;
    font-size:1.05rem;
  }
`;
export default SingnUp