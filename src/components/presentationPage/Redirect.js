import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Login from '../login/Login';

export default function Redirect() {
    const [view, setView] = useState(0);
    
    setTimeout(function () {
        setView(view + 1);
    }, 1000);

    function Greeting() {
        if (view < 5) {
        return <PresentationPage/>
        }
        return <Login/>
    }
    return (
        <div>      
            <PresentationPage/>
        </div>
    );
}
