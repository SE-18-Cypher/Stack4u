// import React from 'react';


// export default function outputpage(){
//     return(
//         <div>
//             This is the output page! 
//         </div>
//     )
// }

import React from 'react';
import { FileUploader } from "react-drag-drop-files";
import Button from '@mui/material/Button';
import './output.css';
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


    
    return (

        <div className='bk2'>
            <NavBar />
            {/* <div className='commonbg' /> */}

                    <div className='Contentt'>
                        <div className='mainPageContent2' >
                            <div className='text1'>
                                <h3 style={{textAlign:'center', paddingTop:'30px',fontFamily:'calibri',color:'#037ED7',fontSize:'35px'}}> Suitable Stack</h3>
                            </div>
                            
                             </div>
                            
                            
                        <div className='mainPageContent3' > 
                            <div className='text1'>
                                <h3 style={{textAlign:'center', paddingTop:'30px',fontFamily:'calibri',color:'#037ED7',fontSize:'35px' }}> User Preferred Stack</h3>
                            </div>
                        </div> 
                                
            
                        
                    </div>
                   
                            
            
                


            <div className='footerMainPage2'>
                <div style={{ backgroundColor: '#045794C9' }}>
                    <img src={mainpageFooter} alt='decoration - circuitboard' className='footerImage' />
                </div>
                <div className="content-left3">
                    <a href="/home">
                        <img src={mainpageFooterStack4uLogo} alt='stack4u logo' />
                    </a>
                    <h6 >We present a web based technology stack <br /> recommendation system</h6>
                    <br />
                    {/* <Button variant='contained' onClick={() => navigate("/contactus")}> Contact </Button>
                        <br /> */}
                    <a href="https://www.facebook.com/Stack4u-111840144770759">
                        <img src={fblogo} alt="fblogo" style={{ height: '5%', width: '5%' }} />
                    </a>
                </div>
                <div className="content-right3">

                    <a href="techinfoPage"> About us</a>
                    <br />
                    <a href="contactus"> Contact us </a>
                    {/* <h6> Email : cypherstack4u@gmail.com</h6> */}
                    <br />
                    <br />
                    <p className='copy2'> Copyright © All rights reserved </p>
                </div>
            </div>
           
        </div>

    )
}
