import React, { useState } from 'react';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import './Common.css';
import TechInfoPage from '../../techInfoPage/TechInfoPage';

import computerImage from '../../../resources/images/computerImage.png';
import stack4uLOGO_OG_T from '../../../resources/images/stack4uLOGO_OG_T.png';
import cloudImage from '../../../resources/images/cloudImage.png';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router";

export default function Common() {
    const navigate = useNavigate();

    const [view, setView] = useState(true);
    const toggleView = () => setView((view) => !view);

    const [skipLogin, setSkipLogin] = useState(false);

    if (skipLogin){
        return <TechInfoPage/>
    }

    return(
        <div className="body">
            <div className="contentBody">
                <Box
                    sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: 450,
                        height: 580,
                        m:1,
                    },
                    }}
                >
                    <Paper elevation={24}>
                        <div className="headerContent">
                            <button className="signButtons" onClick={toggleView} disabled={view}>
                                <h2 className={view ? "activeType":"notActiveType"}>Sign up</h2>
                            </button>
                            <button className="signButtons" onClick={toggleView} disabled={!view}>
                                <h2 className={!view ? "activeType":"notActiveType"}>Sign in</h2>
                            </button>
                            {view && <Signup />}
                            {!view && <Signin />}
                        </div>
                    </Paper>
                </Box>
            </div>
            <img src={stack4uLOGO_OG_T} className='logo' alt='stack4u logo' width={300}/> 
            <img src={cloudImage} className="designCloudImage" alt='cloud image'/>   
            <div className="welcomeContent">
                <h1> Hello, </h1>
                <p>Sign up here to get a <br/> better experience </p>
                <Button variant="contained" onClick={() => navigate("/techInfoPage")} sx={{pl:5,pr:5,bgcolor:'black'}}>Skip</Button>          
            </div> 
            <img src={computerImage} className="designComputerImage" alt='computer image'/>
        </div>
    )
}
