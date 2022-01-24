import { Divider } from '@mui/material';
import React, { useState } from 'react';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import './Common.css';

export default function Common() {

    const [view, setView] = useState(true);
    const toggleView = () => setView((view) => !view);

    return(
        <div className="body">
            <button className="signButtons" onClick={toggleView} disabled={view}>
                <h2>Sign up</h2>
            </button>
            <button className="signButtons" onClick={toggleView} disabled={!view}>
                <h2>Sign in</h2>
            </button>
            <div className="divider">
                <Divider width={274} />
            </div>
            {view && <Signup />}
            {!view && <Signin />}
        </div>
    )
}
