import React, { useState } from 'react';
import Common from '../login/common/Common';
import Button from '@mui/material/Button';

import './TechInfoPage.css';
import Frontend from './frontend/Frontend';
import Backend  from './backend/Backend';
import Database from './database/Database';

import { useNavigate } from "react-router";

export default function TechInfoPage(){
  const navigate = useNavigate();

  document.title="stack4u/TechnologyInformation";

  const [backToSignup, setBackToSignup] = useState(false);
  const toggleBackToSignup = () => setBackToSignup(true);

  const [num, setNum] = useState(0);
  const update = () => {
    if(num === 2){
      setNum(0);
    }
    else{
      setNum(num + 1);
    } 
  }

  if (backToSignup){
    return <Common/>
  }

  function SwitchPage(){
    if (num === 0) {
      return <Frontend/>
    }
    if (num === 1) {
        return <Backend/>
    }
    if (num === 2) {
      return <Database/> 
    }
  }
  return (
    <div>
      <Button variant="contained" onClick={() => navigate("../login/common/Common")} className = "backToLoginButton">BACK TO SIGN UP</Button>
      <button onClick={update}> Click </button>
      <SwitchPage/>
    </div>
  )
}


