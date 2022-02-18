import React from 'react';
import orgLogo from '../../resources/images/stack4uLOGO_OG_T.png';
import './PresentationPage.css';
import { LinearProgress } from "@mui/material";

export default function PresentationPage() {
    document.title = "Welcome";
    return (
        <div className='presentationPage'>    
            <img src={orgLogo} className='orgLogo' alt='stack4u Logo'/>
            <div className="progressBar">
                <LinearProgress/>
            </div>     
        </div>
    )
}

