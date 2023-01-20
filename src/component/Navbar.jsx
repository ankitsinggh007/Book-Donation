import React, { useState,useContext } from "react";
import { User } from "../App";
import "./navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Route,Routes,Navigate, useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import {AiFillHome}from "react-icons/ai"
import { ClassNames } from "@emotion/react";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const {LoggedInUserData, setLoggedInUserData,createUser}=useContext(User);
  const Navigate=useNavigate();

  const Logout=()=>{
    if(LoggedInUserData.isAuthrized){
      setLoggedInUserData({isAuthrized:false});
    Navigate("/")
    }
    else{
      Navigate("/login")
    }
  }

  return (
    <>
      <nav className="main-nav"  >
        {/* 1st logo part  */}
        <NavLink to="/" className="logo">
          <h2>
            <span>B</span>ook
            <span>D</span>onation
          </h2>
        </NavLink>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to={`home/${LoggedInUserData.Role}`} activeStyle={{color:'red'}}  ><AiFillHome  style={{marginBottom:"7px"}}/>&nbsp;Home</NavLink>
            </li>
           <li>
            <Button onClick={Logout } style={{backgroundColor:"#3B71CA",color:"white",margin:"30px",fontSize:"1.5rem",height:"auto",width:"auto"}}>{LoggedInUserData.isAuthrized?"Log Out":"Log In" }
</Button>
             </li>
          </ul>
        </div>
      
        {/* 3rd social media links */}
        <div className="social-media">

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;
