import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {useNavigate } from "react-router";
import NavBar from './../navBar/NavBar';

import './TechInfoPage.css';
import Backend from './Backend';
import Database from './Database';
import Frontend from './Frontend';

export default function TechInfoPage() {
  const navigate = useNavigate();
  document.title = "stack4u-TechnologyInformation";

  const user = localStorage.getItem("user");

  const [loggedIn, setLoggedIn] = useState(false);
  React.useEffect(() => {
    if (user !== '0') {
      setLoggedIn(true)
    }
  },[user])

  const [frontendView, setFrontendView] = useState(true);
  const [backendView, setBackendView] = useState(false);
  const [databaseView, setDatabaseView] = useState(false);

  function switchFrontend() {
    setFrontendView(true);
    setBackendView(false);
    setDatabaseView(false);
  }

  function switchBackend() {
    setFrontendView(false);
    setBackendView(true);
    setDatabaseView(false);
  }

  function switchDatabase() {
    setFrontendView(false);
    setBackendView(false);
    setDatabaseView(true);
  }

  return (
    <div>
      {loggedIn && (
        <NavBar uidValue={user} />
      )}
      <div className="commonBg" />
      <div>
        <h2 style={{ textAlign: "center", paddingTop: 50, position: 'relative', fontSize:'30px', color:'black' }}> TECHNOLOGY INFORMATION</h2>

        <div style={{  marginLeft:'10%', marginTop:'2%' }}>
          <Button style={{ marginLeft: 10, marginRight: 30,  fontSize:'20px', fontWeight: 'bold', fontFamily: 'calibri' }} onClick={switchFrontend}> <p className={frontendView ? "activeType" : "notActiveType"}> FRONTEND </p> </Button>
          <Button style={{ marginLeft: 10, marginRight: 30,  fontSize:'20px', fontWeight: 'bold', fontFamily: 'calibri' }} onClick={switchBackend} > <p className={backendView ? "activeType" : "notActiveType"}> BACKEND  </p> </Button>
          <Button style={{ marginLeft: 10, marginRight: 30,  fontSize:'20px', fontWeight: 'bold', fontFamily: 'calibri'}} onClick={switchDatabase}> <p className={databaseView ? "activeType" : "notActiveType"}> DATABASE </p> </Button>
        </div>

        <div style={{
          position: 'relative',
          marginTop: -5,
          marginLeft: 'auto',        
          marginRight: 'auto',
          display: 'block',
          textAlign: 'center'
        }}>
          {!backendView && !databaseView && (
            <Frontend />
          )}
          {!frontendView && !databaseView && (
            <Backend />
          )}
          {!backendView && !frontendView && (
            <Database />
          )}
        </div>

        {!loggedIn && (
          <div className='backToLoginButton'>
            <Button variant="contained" onClick={() => navigate("/login")}>BACK TO SIGN UP</Button>
          </div>
        )}
      </div>
    </div>
  )
}