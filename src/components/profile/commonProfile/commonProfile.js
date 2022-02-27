import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Profile } from '../user profile/profile';
import { Preferences } from '../user preferences/preferences';
import './commonProfile.css';
import { Avatar, Typography } from '@mui/material';
import NavBar from '../../navBar/NavBar'

export default function CommonProfile() {

    const [view, setView] = useState(true);
    const toggleView = () => setView((view) => !view);
    // const paperstyle = { padding: 20, height: '70vh', width: 1000, margin: "-730px 600px" }
    // const paperstyleProf = { padding: 20, height: '70vh', width: 400, margin: "125px 100px" }

    return (
        <div>
            <NavBar/>
            <div className="profilePage">

                <div className='profilePicContainer'>
                    {/* <Paper elevation={10} style={paperstyleProf}> */}
                    <Paper elevation={10} >
                        <div>
                            <Avatar alt="Prof page"
                                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                sx={{ width: 300, height: 300, margin: 'auto' }}
                            />
                            <Typography variant="h4" align='center'>User Name</Typography>
                        </div>
                    </Paper>
                </div>

                <div className='profileInfoContainer'>
                    {/* <Paper elevation={10} style={paperstyle}> */}
                    <Paper elevation={10}>
                        <div className="headerContent">
                            <button className="profileButtons" onClick={toggleView} disabled={view}>
                                <h2 className={view ? "activeType" : "notActiveType"}>My Profile</h2>
                            </button>
                            <button className="profileButtons" onClick={toggleView} disabled={!view}>
                                <h2 className={!view ? "activeType" : "notActiveType"}>Technology Preferences</h2>
                            </button>
                            {view && <Profile />}
                            {!view && <Preferences />}
                        </div>
                    </Paper>
                </div>

            </div>
        </div>

    )
}
