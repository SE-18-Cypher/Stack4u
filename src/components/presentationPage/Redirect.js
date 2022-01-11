import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Signup from '../signup/Signup';
// import Signin from '../signin/Signin';

export default function Redirect() {
    const [view, setView] = useState(0);
    
    setTimeout(function () {
        setView(view + 1);
    }, 1000);

    function Greeting() {
        if (view < 5) {
        return <PresentationPage/>
        }
        return <Signup/>
    }
    return (
        <div>      
            <Signup/>
        </div>
    );
}
