import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Common from '../login/common/Common';
import Home from './../homePage/HomePage';

export default function Redirect() {
    const [view, setView] = useState(0);

    // sessionStorage.setItem("user", null);
    // sessionStorage.setItem("guser", null);
    console.log(sessionStorage.getItem("guser"))
    // sessionStorage.setItem("guserFirstName", null);
    // sessionStorage.setItem("guserSecondName", null);
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserg = localStorage.getItem("guser");
    const ssloggedInUser = sessionStorage.getItem("user");
    const ssloggedInUserg = sessionStorage.getItem("guser");

    console.log(ssloggedInUser)
    console.log(ssloggedInUserg)
    setTimeout(function () {
        if (view < 3) {
            setView(view + 1);
        }
    }, 1000);

    function Greeting() {
        if (view < 3) {
            return <PresentationPage />
        }
        if (ssloggedInUserg !== null &&  ssloggedInUser !== null) {
            return <Home />
        }
        if (loggedInUser === 'null' || loggedInUser === null) {
            return <Common />
        }
    }
    return (
        <div>
            <Greeting />
        </div>
    );
}