import React from 'react'
///import logo from '../../resources/images/stack4uLOGO.png'
import orgLogo from '../../resources/images/stack4uLOGO_OG_T.png'
import './PresentationPage.css';
import { LinearProgress } from "@mui/material";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function PresentationPage() {
    document.title = "Welcome"
    return (
        <div className = 'fill-window'>
            <div className='presentationPage'>    
                {/* <img src={logo} className='logo' alt='stack4u Logo'/>  */}
                <img src={orgLogo} className='orgLogo' alt='stack4u Logo'/>
                <div className="progressBar">
                    <LinearProgress/>    
                </div>
            </div>
        </div>
    )
}


