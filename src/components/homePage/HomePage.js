import React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';

import './HomePage.css';
import mainPageComputer from './../../resources/images/mainPage/mainpageComputer.png';
import mainPageImageIcon from './../../resources/images/mainPage/mainpageImageIcon.png';
import mainpageRecommendationProcess from './../../resources/images/mainPage/mainpageRecommendationProcess.png';
import mainpageFooter from './../../resources/images/mainPage/mainpageFooter.png';
import mainpageFooterStack4uLogo from './../../resources/images/mainPage/mainpageFooterStack4uLogo.png';
import mainpageBackground from './../../resources/images/mainPage/mainpageBackground.png';
import mainpageLaptop from './../../resources/images/mainPage/mainPageLaptop.png';

import { useNavigate } from "react-router";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import NavBar from './../navBar/NavBar';

import app from './../../Firebase-config';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getStorage } from "firebase/storage";

const fileTypes = ["JPEG", "PDF"];

export default function HomePage() {

    const navigate = useNavigate();

    const [file, setFile] = React.useState('');
    const handleChange = (file) => {
        setFile(file);
    };
    console.log(file);

    const storage = getStorage(app);

    React.useEffect(() => {
        uploadFiles();
    }, [file])

    const uploadFiles = () => {
        console.log("Works")
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                });
            }
        );
    };

    
    const testRef = React.useRef(null);
    const scrollToElement = () => testRef.current.scrollIntoView();
    return (
        <div>
            <div className='commonbg' />
            <div className='mainPageContent'>
                <NavBar />
                <div style={{ color: 'white' }}>
                    <img src={mainpageBackground} alt='decoration background' className='mainPageBackground' />
                    <div className="content-left">
                        <p className='mainPageBackgroundHeader'>Technology Stack <br /> Recommender</p>
                        <p className='mainPageBackgroundText'>
                            We present an online technology stack recommendation
                            system to recommend the most suitable technology stack
                            according to your given requiments.
                            Upload the software requiment specification document
                            or input the details manually, click on submit and get the
                            recommended technology stack.
                        </p>
                        <div className='mainPageGetStartedButton'>
                            <Button variant='contained' onClick={scrollToElement}> < span style={{ fontSize: 25 }}> Get Started</span> </Button>
                        </div>
                    </div>
                    <div className="content-right2">
                        <img src={mainpageLaptop} alt='decoration background' />
                    </div>
                </div>
                <br ref={testRef}/>
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
                    <div className="content-left">
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
                    <div className="content-right">
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
