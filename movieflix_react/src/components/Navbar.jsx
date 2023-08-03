import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { FaPowerOff, FaSearch } from "react-icons/fa"
import { firebaseAuth } from "../utils/firebase-config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = ({ isScrolled }) => {

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    const navigate = useNavigate();
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" }
    ]

    //to keep user signed in until we log out
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login")
    })

    return (
        <Conatiner className="conatiner">
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`} >
                <div className="left flex a-center">
                    <div className="brand flex a-center">
                        <img src={logo} alt="navbar" />
                    </div>
                    <ul className="links flex text">
                        {
                            links.map((linkName, index) => {
                                return (
                                    <li key={linkName.name}><NavLink to={linkName.link}>{linkName.name}</NavLink></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button onFocus={() => setShowSearch(true)}
                            onBlur={() => {
                                if (!inputHover) setShowSearch(false);
                            }}
                        >
                            <FaSearch />
                        </button>
                        <input type="text" placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false);
                            }} />
                    </div>
                    <button onClick={() => signOut(firebaseAuth)}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>

        </Conatiner>
    )

}

const Conatiner = styled.div`

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
 
  .scrolled{
    background-color :black;
  }
  nav{
    position:fixed;
    top:0;
    height:6.5rem;
    width:100%;
    justify-content:space-between;
    z-index:2;
    padding:0 4rem;
    align-items: center;
    trasnsition :0.1s ease-in-out;
  }

  .left{
    gap:2rem;
}

.brand img{
    height:4rem;
}

.links{
    list-style-type:none;
    gap: 2rem;
}
li{
    a{
        color:white;
        text-decoration:none;
    }
}

.right{
    gap:1rem;

 button{
    background-color:transparent;
    border:none;
    cursor:pointer;
&:focus{
        font-size:1.2rem;
    }
    svg{
        color: #f34242;
        font-size:1.2rem;
    }
 }

 .search{
    gap:0.5rem;
    display:flex;
    align-items:center;
    justify-content:center;
    padding 0.2rem;
    padding-left:0.5rem;

    button{
        background-color:transparent;
        svg{
            color:white;
        }
    }

    input{
        width:0;
        opacity:0;
        visibility:hidden;
        transition: 0.3s ease-in-out;
        background-color:transparent;
        border:none;
        color:white;
        &:focus{
            outline:none;
        }
    }
 }

 .show-search{
    border:1px solid white;
    background-color:rgba(0,0,0,0.6);
    input{
        width:100%;
        opacity:1;
        visibility:visible;
        padding: 0.3rem;
    }
 }
}


  `;
export default Navbar;