import React from 'react';
import './output.css';
import mainpageFooter from './../../resources/images/mainPage/mainpageFooter.png';
import mainpageFooterStack4uLogo from './../../resources/images/mainPage/mainpageFooterStack4uLogo.png';
import NavBar from '../navBar/NavBar';
import fblogo from '../../resources/images/facebook.png';
import Feedback from '../feedback/Feedback';
import output from './../../resources/images/output.png';


export default function Output() {
    var webFrontend    = sessionStorage.getItem("finalTechStackWF");
    var mobileFrontend = sessionStorage.getItem("finalTechStackMF");
    var backend        = sessionStorage.getItem("finalTechStackB" );
    var database       = sessionStorage.getItem("finalTechStackD" );
    
    React.useEffect(() => {
        console.log(webFrontend)
        console.log(mobileFrontend)
        console.log(backend)
        console.log(database)
    },)

    return (
        <div className='bk2'>
            <NavBar />
            <div className='Contentt'>
                <div className='mainPageContent2' >
                    <div className='text1'>
                        <h3 style={{ textAlign: 'center', paddingTop: '30px', fontFamily: 'calibri', color: '#037ED7', fontSize: '35px' }}> Suitable Stack</h3>
                    </div>
                </div>

                <div className='mainPageContent3' >
                    <div className='text1'>
                        <h3 style={{ textAlign: 'center', paddingTop: '30px', fontFamily: 'calibri', color: '#037ED7', fontSize: '35px' }}> User Preferred Stack</h3>
                    </div>
                </div>
            </div>

            <div className='bkimage'>
                <img src={output} width="450px" />
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
            <Feedback />
        </div>

    )
}
