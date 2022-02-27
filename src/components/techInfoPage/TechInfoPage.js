import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import NavBar from './../navBar/NavBar';

import './TechInfoPage.css';
import Backend from './Backend';
import Database from './Database';
import Frontend from './Frontend';

export default function TechInfoPage(){
  const navigate = useNavigate();
  document.title="stack4u-TechnologyInformation";

  const [frontendView, setFrontendView] = useState(true);
  const [backendView , setBackendView ] = useState(false);
  const [databaseView, setDatabaseView] = useState(false);

  function switchFrontend(){
    setFrontendView(true);
    setBackendView(false);
    setDatabaseView(false);
  }

  function switchBackend(){
    setFrontendView(false);
    setBackendView(true);
    setDatabaseView(false);
  }

  function switchDatabase(){
    setFrontendView(false);
    setBackendView(false);
    setDatabaseView(true);
  }

  return (
    <div>
      <NavBar/>
      <div className="commonBg"/>
      
      <h2 style={{textAlign: "center",marginTop:50, position:'relative'}}> TECHNOLOGY INFORMATION</h2>
   
      <div style={{float:'right',margin:10}}>
        <Button style={{marginLeft:10,marginRight:10}} onClick={switchFrontend}> <p className={frontendView ? "activeType":"notActiveType"}> FRONTEND </p> </Button>
        <Button style={{marginLeft:10,marginRight:10}} onClick={switchBackend} > <p className={backendView  ? "activeType":"notActiveType"}> BACKEND  </p> </Button>
        <Button style={{marginLeft:10,marginRight:30}} onClick={switchDatabase}> <p className={databaseView ? "activeType":"notActiveType"}> DATABASE </p> </Button>
      </div>

      <div style={{
        position:'relative',
        marginTop:100,
        marginLeft:'auto',
        marginRight:'auto',
        display:'block',
        textAlign:'center'
      }}>
        {!backendView && !databaseView &&(
          <Frontend/>
        )}
        {!frontendView && !databaseView && (
          <Backend/>
        )}
        {!backendView && !frontendView && (
          <Database/>
        )}
      </div>

      <div className='backToLoginButton'>
        <Button variant="contained" onClick={() => navigate("/login")}>BACK TO SIGN UP</Button>
      </div>
      
    </div>
  )
}