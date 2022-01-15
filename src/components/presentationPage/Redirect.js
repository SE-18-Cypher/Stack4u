import React from 'react'
import { useState , useEffect } from 'react';
import PresentationPage from './PresentationPage';
import Signup from '../signup/Signup';

export default function Redirect() {
    const [view, setView] = useState(0);
        
    const timer = setTimeout(function () {
        if (view<3){
            setView(view + 1);
        }
    }, 1000);

    function Greeting() {
        if (view<3) {
            return <PresentationPage/>
        }
        else {
            return <Signup/>
        }
    }
    return (
        <div>      
            <Greeting/>
        </div>
    );
}
