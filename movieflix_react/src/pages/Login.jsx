//login using firebase
import React, { useState } from "react";
import styled from "styled-components"
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/Header";
import {firebaseAuth} from "../utils/firebase-config"
import {onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const navigate = useNavigate();
    const [formValues, setFormValues]= useState({
     email:"",
     password:"",
    });

// handling login 
const handleLogIn = async()=>{
        try{
            const {email,password}=formValues;
            await signInWithEmailAndPassword(firebaseAuth,email,password);
         }catch(err){
               console.log(err);
         }
    }
//to keep user signed in until we log out
onAuthStateChanged(firebaseAuth,(currentUser)=>{       
        if(currentUser) navigate("/")
    })

   return( <Container>
        <BackgroundImg/>
        <div className="content">
          <Header />
          <div className="form-conatiner flex column a-center j-center">
               <div className="form flex column a-center j-center">
                  <div className="title text">
                      <h3>Login</h3>
                  </div>
                  <div className="container flex column">
                  <input type="email" placeholder="Enter your Email" name="email" value={formValues.email} onChange={(e)=>setFormValues({...formValues,
                    [e.target.name]: e.target.value})
                    }/>
                    <input type="password" placeholder="Enter your Password" name="password"value={formValues.password} onChange={(e)=>setFormValues({...formValues,
                        [e.target.name]: e.target.value})
                    }/>
                    <button onClick={handleLogIn}>LOGIN</button>
                  </div>
               </div>
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
   .text h3{
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
   
   .form-conatiner{
      gap:2rem;
      height:85vh;
   }
   .form {
    padding:2 rem;
    background-color:#000000b0;
    width:25vw;
    gap:2rem;
    color: white;
   }

   .container{
    gap : 2rem;
   }

   .form input{
     color:black;
     width:15rem;
     padding: 0.5rem  1rem;
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
     border-radius:0.5rem;
     color: white;
     font-weight:bolder;
     font-size:1.05rem;
   }
 `;

export default Login