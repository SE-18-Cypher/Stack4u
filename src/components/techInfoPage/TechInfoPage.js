import React, { useState } from 'react';
import Common from '../login/common/Common'
import Button from '@mui/material/Button';

export default function TechInfoPage(){

  document.title="stack4u/TechnologyInformation";

  const [backToSignup, setBackToSignup] = useState(false);
  const toggleBackToSignup = () => setBackToSignup(true);

  if (backToSignup){
    return <Common/>
  }

  return (
    <div>
        This is the tech info page
        <Button variant="contained" onClick={toggleBackToSignup}>BACK TO SIGN UP</Button>
    </div>
  )
}


