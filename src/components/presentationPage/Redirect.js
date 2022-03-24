import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Common from '../login/common/Common';
import Home from './../homePage/HomePage';

export default function Redirect() {
    const [view, setView] = useState(0);

    const loggedInUser = localStorage.getItem("user");
    const ssloggedInUser = sessionStorage.getItem("user");

    // console.log(sessionStorage.getItem("guser"))
    // console.log(loggedInUser)
    // const loggedInUserg = localStorage.getItem("guser");
    // console.log(ssloggedInUser)
    // const ssloggedInUserg = sessionStorage.getItem("guser");

   
    setTimeout(function () {
        if (view < 3) {
            setView(view + 1);
        }
    }, 1000);

    function Greeting() {
        if (view < 3) {
            return <PresentationPage />
        }
        if (ssloggedInUser !== null){
            return <Home />
        }
        if (loggedInUser === null || loggedInUser === 'null') {
            return <Common />
        }
        if (loggedInUser !== null && loggedInUser !== 'null'){
            return <Home />
        }
    }
    return (
        <div>
            <Greeting />
        </div>
    );
}