import React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';

import './HomePage.css';
import mainPageComputer from './../../resources/images/mainpageComputer.png';
import mainPageImageIcon from './../../resources/images/mainpageImageIcon.png';
import mainpageRecommendationProcess from './../../resources/images/mainpageRecommendationProcess.png';
import mainpageFooter from './../../resources/images/mainpageFooter.png';
import mainpageFooterStack4uLogo from './../../resources/images/mainpageFooterStack4uLogo.png';
import { useNavigate } from "react-router";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import Home from './../home/Home';

const fileTypes = ["JPEG", "PDF"];

export default function HomePage() {

    const [file, setFile] = React.useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    console.log(file);

    const navigate = useNavigate();
    return (
        <div>
            <div className='commonbg' />
            <div className='mainPageContent'>
                <Home />
                <div className='dragAndDropOutsideContainer'>
                    <br />
                    <div className='dragAndDropContainer'>
                        <FileUploader
                            multiple={false}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            classes='uploader'
                        >
                            <div style={{ marginTop: 180 }}>
                                <img src={mainPageImageIcon} alt='decoration - icon' width={80} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                                <h4 style={{ textAlign: 'center', color: '#043B63' }}> Upload your .pdf or .jpeg here</h4>
                            </div>
                        </FileUploader>
                    </div>
                    <img src={mainPageComputer} alt='decoration - computer' className='decorationComputerImage' />
                    <div className='textInputContainer'>
                        <h4> OR </h4>
                        <br />
                        <Button variant='contained' onClick={() => navigate("/manualinput")}> Enter requirement specification manually </Button>
                    </div>
                </div>
                <hr className='lineBreak' />
                <div className='recommendationProcessImage'>
                    <img src={mainpageRecommendationProcess} alt='recommendation process' />
                </div>
                <div className='footerMainPage'>
                    <div style={{ backgroundColor: '#045794C9' }}>
                        <img src={mainpageFooter} alt='decoration - circuitboard' className='footerImage' />
                    </div>
                    <div class="footerContent-left">
                        <img src={mainpageFooterStack4uLogo} alt='stack4u logo' />
                        <h6 >We present a web based technology stack <br /> recommendation system</h6>
                        <br />
                        <Button variant='contained' onClick={() => navigate("/contactus")}> Contact us</Button>
                        <br />
                        <div style={{ marginTop: 25 }}>
                            <FacebookIcon />
                            <InstagramIcon />
                            <TwitterIcon />
                        </div>
                    </div>
                    <div class="footerContent-right">
                        <h3> Contact us</h3> <br />
                        <h6> Phone : +94 77 559 5632</h6>
                        <h6> Email : cypherstack4u@gmail.com</h6>
                    </div>
                </div>
                <p className='copyrightText'> Copyright © All rights reserved </p>
            </div>
        </div>
    )
}
