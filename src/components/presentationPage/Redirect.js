import React from 'react'
import { useState } from 'react';
import PresentationPage from './PresentationPage';
import Common from '../login/common/Common'


export default function Redirect() {
    const [view, setView] = useState(0);
        
    setTimeout(function () {
        if (view<3){
            setView(view + 1);
        }
    }, 1000);

    function Greeting() {
        if (view<3) {
            return <PresentationPage/>
        }
        else {
            return <Common/>
        }
    }
    return (
        <div>      
            <Greeting/>
        </div>
    );
}