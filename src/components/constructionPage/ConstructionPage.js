import React from 'react';
import { NavLink } from 'react-router-dom';
import errorlogo from "./../../resources/images/construct.jpg";
import "./ConstructionPage.css";

export default function ErrorPage() {

  return (

    <div className='Construction'>
      <div >
        <img className="construct" src={errorlogo} alt="Costruction Logo" />
        <br></br>
        <p><h4>UH, SORRY!.</h4></p>
        
        <p>The page you are trying to reach is still under construction. We will be developing this page as soon as possible.<br></br> Thank you  ヅ
        </p>
        <div className="homebutton">
          <button type="button" class="button1">
            <NavLink to="/home"> Back to Home </NavLink>
          </button>
        </div>
      </div>
    </div>

  );
}

