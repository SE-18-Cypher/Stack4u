import React from 'react';
import './output.css';
import mainpageFooter from './../../resources/images/mainPage/mainpageFooter.png';
import mainpageFooterStack4uLogo from './../../resources/images/mainPage/mainpageFooterStack4uLogo.png';
import NavBar from '../navBar/NavBar';
import fblogo from '../../resources/images/facebook.png';
import Feedback from '../feedback/Feedback';
import output from './../../resources/images/output.png';
import mainPageComputer from './../../resources/images/mainPage/mainpageComputer.png';

import reactLogo from './../../resources/images/techpage/frontend/reactLogo.png';
import vueLogo from './../../resources/images/techpage/frontend/vue.png';
import angularLogo from './../../resources/images/techpage/frontend/angular.png';
import nodeLogo from './../../resources/images/techpage/frontend/node.png';
import javascriptLogo from './../../resources/images/techpage/backend/javascript.png';

import angularMobileLogo from './../../resources/images/techpage/mobileFrontend/angularMobile.png';
import flutterLogo from './../../resources/images/techpage/mobileFrontend/flutter.png';
import ionicLogo from './../../resources/images/techpage/mobileFrontend/ionic.png';
import xamarinLogo from './../../resources/images/techpage/mobileFrontend/xamarin.png';
import jqueryLogo from './../../resources/images/techpage/mobileFrontend/jquery.png';

import javaLogo from './../../resources/images/techpage/backend/java.png';
import pythonLogo from './../../resources/images/techpage/backend/python.png';
import phpLogo from './../../resources/images/techpage/backend/php.png';
import cLogo from './../../resources/images/techpage/backend/c.png';
import rubyLogo from './../../resources/images/techpage/backend/ruby.png';
import goLogo from './../../resources/images/techpage/backend/go.png';

import mysqlLogo from './../../resources/images/techpage/database/mysql.png';
import mongodbLogo from './../../resources/images/techpage/database/mongoDB.png';
import firebaseLogo from './../../resources/images/techpage/database/firebase.png';
import nosqlLogo from './../../resources/images/techpage/database/nosql.png';
import sqlserverLogo from './../../resources/images/techpage/database/sqlserver.png';
import postgresqlLogo from './../../resources/images/techpage/database/postgresql.png';

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


    const frontendTech = [
        [reactLogo, 'ReactJs', 'reactLogo'],
        [angularLogo, 'AngularJs', 'angularLogo'],
        [nodeLogo, 'NodeJs', 'nodeLogo'],
        [javascriptLogo, 'Javascript', 'javascriptLogo'],
        [vueLogo, 'VueJs', 'vueLogo'],
    ];

    const frontendMobileTech = [
        [reactLogo, 'React Native', 'reactLogo'],
        [angularMobileLogo, 'Mobile Angular UI', 'angularMobileLogo'],
        [flutterLogo, 'Flutter', 'flutter Logo'],
        [ionicLogo, 'Ionic', 'ionic logo'],
        [xamarinLogo, 'Xamarin', 'xamarin logo'],
        [jqueryLogo, 'Jquery', 'jquery logo'],
    ];

    const backendTech = [
        [javaLogo, 'Java', 'javaLogo'],
        [pythonLogo, 'Python', 'pythonLogo'],
        [phpLogo, 'PHP', 'phpLogo'],
        [cLogo, 'C#', 'cLogo'],
        [javascriptLogo, 'Javascript', 'javascriptLogo'],
        [rubyLogo, 'Ruby', 'rubyLogo'],
        [goLogo, 'Go', 'goLogo'],
    ];

    const databaseTech = [
        [mysqlLogo, 'MySQL', 'mysql logo'],
        [mongodbLogo, 'MongoDB', 'mongodb logo'],
        [nosqlLogo, 'NoSQL', 'no sql logo'],
        [firebaseLogo, 'Firebase', 'firebase logo'],
        [sqlserverLogo, 'SQLServer', 'sql server logo'],
        [postgresqlLogo, 'PostgreSQL', 'postgresql logo'],
    ];

    const [frontendWeb, setFrontendWeb] = React.useState(1);
    const [frontendMobile, setFrontendMobile] = React.useState(1);
    const [backend, setBackend] = React.useState(1);
    const [database, setDatabase] = React.useState(1);

    React.useEffect(() => {
        const techStack = sessionStorage.getItem("finalTechStack");
        console.log(techStack);

        
    }, [])


    // React.useEffect(() => {

    // }, [third])
    

    return (
        <div className='bk2'>
            <NavBar />
            <div className='Contentt'>
                <div className='mainPageContent2' >
                    <div className='text1'>
                        <h3 style={{ textAlign: 'center', paddingTop: '30px', fontFamily: 'calibri', color: '#037ED7', fontSize: '35px' }}> Suitable Stack</h3>
                    </div>
                    <div style={{float:'left'}}>
                        <p>Web Frontend</p>
                        <img src={frontendTech[frontendWeb][0]} width={100} />
                    </div>
                    <div style={{float:'right'}}>
                        <p>Mobile Frontend</p>
                        <img src={frontendMobileTech[frontendMobile][0]} width={100} />
                    </div>
                    <br/>
                    <div style={{float:'left',bottom:0, position:'absolute'}}>
                        <p>Backend</p>
                        <img src={backendTech[backend][0]} width={100} />
                    </div>
                    <div style={{float:'right',bottom:0, right:0, position:'absolute'}}>
                        <p>Database</p>
                        <img src={databaseTech[database][0]} width={100} />
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
