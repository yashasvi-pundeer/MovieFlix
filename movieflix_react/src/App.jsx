import React from "react";
import { BrowserRouter, Route , Routes, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SingnUp from "./pages/Singnup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import UserLiked from "./pages/UserLiked";

const App=()=>{
 return(
     <BrowserRouter>
     <Routes>
     <Route exact path="/" element={<Netflix />}/>
     <Route exact path="/login" element={<Login />}/>
     <Route exact path="/signup" element={<SingnUp />}/>
     <Route exact path="/player" element={<Player />}/>
     <Route exact path="/movies" element={<Movies />}/>
     <Route exact path="/tv" element={<Tv />}/>
     <Route exact path="/mylist" element={<UserLiked />}/>
     </Routes>
     </BrowserRouter>
 );
}

export default App
