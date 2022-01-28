import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

import './TechInfoPage.css';
import Frontend from './frontend/Frontend';
import Backend  from './backend/Backend';
import Database from './database/Database';

export default function TechInfoPage(){
  const navigate = useNavigate();
  document.title="stack4u-TechnologyInformation";

  const [num, setNum] = useState(0);
  const switchForward = () => {
    if(num === 2){
      setNum(0);
    }
    else{
      setNum(num + 1);
    } 
  }
  const switchBackward = () => {
    if(num === 0){
      setNum(2);
    }
    else{
      setNum(num - 1);
    } 
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
    <div className="body">
      <div className='backToLoginButton'>
        <Button variant="contained" onClick={() => navigate("../login/common/Common")}>BACK TO SIGN UP</Button>
      </div> 
      <h2 style={{textAlign: "center"}}> TECHNOLOGY INFORMATION</h2>
      <div style={{marginLeft:70}}>
        <Button variant="contained" onClick={switchBackward}> { '<< Switch'} </Button>
        <Button variant="contained" onClick={switchForward} style={{marginLeft:1000}}> { 'Switch >>'} </Button>
      </div>
      <div className='techContainer'>
        <SwitchPage/>
      </div>
 
    </div>
  )
}


