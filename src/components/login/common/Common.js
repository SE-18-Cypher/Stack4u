import React, { useState } from 'react';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import './Common.css';

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

    return (
        <div className="body">
            <div className="contentBody">
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            width: 450,
                            height: 580,
                            m: 1,
                        },
                    }}
                >
                    <Paper elevation={2}>
                        <div className="headerContent">
                            <button className="signButtons" onClick={toggleView} disabled={view}>
                                <h2 className={view ? "activeType1" : "notActiveType1"}>Sign up</h2>
                            </button>
                            <button className="signButtons" onClick={toggleView} disabled={!view}>
                                <h2 className={!view ? "activeType1" : "notActiveType1"}>Sign in</h2>
                            </button>
                            {view && <Signup />}
                            {!view && <Signin />}
                        </div>
                    </Paper>
                </Box>
            </div>
            <img src={stack4uLOGO_OG_T} className='logo' alt='stack4u logo' width={300} />
            <img src={cloudImage} className="designCloudImage" alt='cloud' />
            <div className="welcomeContent">
                <h1 style={{ textAlign: 'left', fontSize: 60, paddingBottom: '9px', fontFamily: 'Arial' }}> Hello, </h1>
                <h3 style={{ textAlign: 'left', fontSize: 40, fontFamily: 'Arial', paddingBottom: '7px' }}>Sign up get a  better <br /> experience </h3>
                <Button variant="contained" onClick={() => navigate("/techInfoPage", { state: { id: 0 } })} sx={{ top: '40px', pl: 5, pr: 5, bgcolor: 'black', height: 37 }}>Skip</Button>

            </div>
            <img src={computerImage} className="designComputerImage" alt='computer' />
        </div>
    )
}
