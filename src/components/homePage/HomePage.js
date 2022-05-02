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
import NavBar from './../navBar/NavBar';
import Feedback from './../feedback/Feedback';
import fblogo from '../../resources/images/facebook.png';
import app from './../../Firebase-config';
import { getStorage } from "firebase/storage";
import Tesseract from 'tesseract.js';
import axios from "axios";

const fileTypes = ["JPEG", "PDF", "JPG", "PNG"];

export default function HomePage() {
    const storage = getStorage(app);
    const localUser = localStorage.getItem("user");
    const user = sessionStorage.getItem("user");
    const guser = sessionStorage.getItem("guser");
    // console.log(guser)
    // const guserFN = sessionStorage.getItem("guserFirstName");
    // const guserLN = sessionStorage.getItem("guserSecondName");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user === null && localUser === null) {
            navigate('/access_error')
        }
    })

    const [rememberMe, setRememberMe] = React.useState(true);
    const remember = sessionStorage.getItem("rememberMe");
    React.useEffect(() => {
        if (remember === 'false') {
            setRememberMe(false)
        }
        console.log(rememberMe)
    }, [rememberMe])

    window.onbeforeunload = closingCode;
    function closingCode() {
        if (rememberMe) {
            console.log("Storing the values")
            localStorage.setItem("user", user);
            // localStorage.setItem("guser", guser);
            // localStorage.setItem("guserFirstName", guserFN);
            // localStorage.setItem("guserSecondName", guserLN);
        }
        // else{
        //     sessionStorage.setItem("user", null);
        //     sessionStorage.setItem("guser", null);
        //     sessionStorage.setItem("guserFirstName", null);
        //     sessionStorage.setItem("guserSecondName", null);
        // }
    }

    const [file, setFile] = React.useState('');
    const handleChange = (file) => {
        setFile(file);
    };



    React.useEffect(() => {
        handleSubmit();
    }, [file])

    // const uploadFiles = () => {
    //     if (!file) return;
    //     const sotrageRef = ref(storage, `files/${file.name}`);
    //     const uploadTask = uploadBytesResumable(sotrageRef, file);

    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const prog = Math.round(
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //             );
    //         },
    //         (error) => console.log(error),
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log("File available at", downloadURL);
    //             });

    //         }
    //     );
    // };

    const testRef = React.useRef(null);
    const scrollToElement = () => testRef.current.scrollIntoView();
    console.log(user)

    const [image, setImage] = React.useState('');
    const [text, setText] = React.useState('');

    const handleSubmit = () => {
        var fileName = file.name
        console.log(fileName === undefined)
        if (fileName !== undefined) {
            var fileExtension = fileName.split('.').pop();
            console.log(fileExtension)
            if (fileExtension === 'pdf') {
                postPdfData(file)
                console.log("file input successful")
            }
            else {
                extractText(file);
            }
        }
    };

    function postPdfData(file) {
        console.log(file[0])
        const formdata = new FormData();
        formdata.append("file", file);

        console.log(file.name)
        axios.post("/index", formdata)
            .then(
                (response) => {
                    var result = response.data;
                    console.log(result)
                    if (parseInt(response.data["1"]) > 6) {
                        getTechStack()
                    }
                    else if (parseInt(response.data["1"]) < 6) {
                        console.log("total accuracy is less than 6%")
                        navigate('/questionnaire')
                    }

                    if (result != null) {
                        localStorage.setItem('data', result)

                        navigate('/Output')
                    }
                    else {
                        navigate('*')
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    function getTechStack() {
        axios.post('/finalStack')
            .then(function (response) {
                localStorage.setItem("finalTechStackWF", response.data["1"]);
                console.log(response.data["1"])
                localStorage.setItem("finalTechStackMF", response.data["2"]);
                console.log(response.data["2"])
                localStorage.setItem("finalTechStackB", response.data["3"]);
                console.log(response.data["3"])
                localStorage.setItem("finalTechStackD", response.data["4"]);
                console.log(response.data["4"])
                navigate('/output')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function extractText(file) {
        Tesseract.recognize(file, 'eng',
            {
                logger: m => console.log(m)
            }
        )
            .catch((err) => {
                console.error(err);
            })
            .then((result) => {
                console.log(result.data.text);
                setText(result.data.text);
            });
    }


    return (

        <div className='bk'>
            <NavBar uidValue={user} />
            <div className='mainPageContent'>
                <div className='mainPageImage'>
                    <img src={mainpageBackground} alt='decoration background' className='mainPageBackground' />
                    <div className="content-left">
                        <p className='mainPageBackgroundHeader'>Technology Stack <br /> Recommender</p>
                        <p className='mainPageBackgroundText'>
                            We present an online technology stack recommendation
                            system to recommend the most suitable technology stack
                            according to your given requiments.
                            <br />
                            Upload the software requirement specification document
                            or input the details manually, click on submit and get the
                            recommended technology stack.
                        </p>
                        <div className='mainPageGetStartedButton'>
                            <Button variant='contained' onClick={scrollToElement}> < span style={{ fontSize: 16 }}> Get Started</span> </Button>
                        </div>
                    </div>
                    <div className="content-right2">
                        <img src={mainpageLaptop} width="400px" alt='decoration background' />
                    </div>

                </div>
                <br ref={testRef} />
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
                            <div style={{ marginTop: 115 }}>
                                <img src={mainPageImageIcon} alt='decoration - icon' width={80} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                                <h4 style={{ textAlign: 'center', color: '#043B63', fontSize: 22, paddingTop: '6%' }}> Upload your .pdf or .jpeg here</h4>
                            </div>
                        </FileUploader>
                    </div>
                    <img src={mainPageComputer} alt='decoration - computer' className='decorationComputerImage' />
                    <div className='textInputContainer'>
                        <h4 style={{ textAlign: 'center', fontSize: 20 }}> OR </h4>
                        <br />

                        <Button variant='contained' onClick={() => navigate("/TextInputPage")}> < span style={{ fontSize: 17 }}> Enter requirement specification manually </span> </Button>

                    </div>
                </div>
                <hr className='lineBreak' />
                <div className='recommendationProcessImage'>
                    <img src={mainpageRecommendationProcess} alt='recommendation process' />
                </div>

            </div>
            <div className='footerMainPage'>
                <div style={{ backgroundColor: '#045794C9' }}>
                    <img src={mainpageFooter} alt='decoration - circuitboard' className='footerImage' />
                </div>
                <div className="content-left2">
                    <a href="/home">
                        <img src={mainpageFooterStack4uLogo} alt='stack4u logo' />
                    </a>
                    <h6 >We present a web based technology stack <br /> recommendation system</h6>
                    <br />
                    <a href="https://www.facebook.com/Stack4u-111840144770759">
                        <img src={fblogo} alt="fblogo" style={{ height: '5%', width: '5%' }} />
                    </a>
                </div>
                <div className="content-right">

                    <a href="aboutus"> About us</a>
                    <br />
                    <a href="Contactus"> Contact us </a>
                    <br />
                    <br />
                    <p className='copy'> Copyright © All rights reserved </p>
                </div>
            </div>
            <Feedback />
        </div>

    )
}
