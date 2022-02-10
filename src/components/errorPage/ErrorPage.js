import React from 'react';
import { NavLink } from 'react-router-dom';
import errorlogo from "./../../resources/images/astronauts.jfif";
import "./ErrorPage.css";

export default function ErrorPage() {

  return (

    <div className='error'>
      <div >
        <img className="errorlogo" src={errorlogo} alt="Error Logo" />
        <h1><b>404</b></h1>
        <p><h4>UH, OH! You are lost.</h4></p>
        <p>The page you are looking for does not exist. How you got here is a mistery. But you can click the button
          below to go back to the sign in page ヅ
        </p>
        <div className="homebutton">
          <button type="button" class="button1">
            <NavLink to="/login"> Sign in </NavLink>
          </button>
        </div>
      </div>
    </div>

  );
}

