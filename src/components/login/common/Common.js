import { Divider } from '@mui/material';
import React, { useState } from 'react';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import './Common.css';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function Common() {

    const [view, setView] = useState(true);
    const toggleView = () => setView((view) => !view);

    return(
        <div className="body">
            <div className="contentBody">
                <Box
                    sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: 450,
                        height: 600,
                        m:1,
                    },
                    }}
                >
                    <Paper elevation={24}>
                        <div className="headerContent">
                            <button className="signButtons" onClick={toggleView} disabled={view}>
                                <h2>Sign up</h2>
                            </button>
                            <button className="signButtons" onClick={toggleView} disabled={!view}>
                                <h2>Sign in</h2>
                            </button>
                            <div className="divider">
                                <Divider width={380} />
                            </div>
                            {view && <Signup />}
                            {!view && <Signin />}
                        </div>
                    </Paper>
                </Box>
            </div>      
        </div>
    )
}
  