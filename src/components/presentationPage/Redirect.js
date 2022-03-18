import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Common from '../login/common/Common';
import Home from './../homePage/HomePage';


export default function Redirect() {
    const [view, setView] = useState(0);
    const loggedInUser = localStorage.getItem("user");

    setTimeout(function () {
        if (view<3){
            setView(view + 1);
        }
    }, 1000);

    function Greeting() {
        if (view<3) {
            return <PresentationPage/>
        }
        if (loggedInUser === '0'){
            return <Common/>
        }
        if (loggedInUser !== '0'){
            return <Home/>
        }
    }
    return (
        <div>      
            <Greeting/>
        </div>
    );
}