import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Common from '../login/common/Common';
import Home from './../homePage/HomePage';

export default function Redirect() {
    const [view, setView] = useState(0);

    sessionStorage.setItem("user", null);
    sessionStorage.setItem("guser", null);
    sessionStorage.setItem("guserFirstName", null);
    sessionStorage.setItem("guserSecondName", null);
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserg = localStorage.getItem("guser");
    
    console.log(loggedInUser)
    console.log(loggedInUserg)
    setTimeout(function () {
        if (view < 3) {
            setView(view + 1);
        }
    }, 1000);

    function Greeting() {
        if (view < 3) {
            return <PresentationPage />
        }
        else if (loggedInUser === 'null' || loggedInUser === null) {
            return <Common />
        }
        else {
            return <Home />
        }
    }
    return (
        <div>
            <Greeting />
        </div>
    );
}