import React from 'react';
import './output.css';
import mainpageFooter from './../../resources/images/mainPage/mainpageFooter.png';
import mainpageFooterStack4uLogo from './../../resources/images/mainPage/mainpageFooterStack4uLogo.png';
import NavBar from '../navBar/NavBar';
import fblogo from '../../resources/images/facebook.png';
import Feedback from '../feedback/Feedback';
import output from './../../resources/images/output.png';
import app from '../../Firebase-config';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import axios from "axios";

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

import xMark from './../../resources/images/xmark.png';
import { style } from '@mui/system';

export default function Output() {

    const user = sessionStorage.getItem("user");
    const firestoreDatabase = getFirestore(app);

    const frontendTech = [
        [reactLogo, 'React', 'reactLogo'],
        [reactLogo, 'ReactJs', 'reactLogo'],
        [angularLogo, 'AngularJs', 'angularLogo'],
        [nodeLogo, 'NodeJs', 'nodeLogo'],
        [javascriptLogo, 'Javascript', 'javascriptLogo'],
        [vueLogo, 'VueJs', 'vueLogo'],
        [xMark, 'Not Selected']
    ];

    const frontendMobileTech = [
        [reactLogo, 'React Native', 'reactLogo'],
        [angularMobileLogo, 'Mobile Angular UI', 'angularMobileLogo'],
        [flutterLogo, 'Flutter', 'flutter Logo'],
        [ionicLogo, 'Ionic', 'ionic logo'],
        [xamarinLogo, 'Xamarin', 'xamarin logo'],
        [jqueryLogo, 'Jquery', 'jquery logo'],
        [xMark, 'Not Selected']
    ];

    const backendTech = [
        [javaLogo, 'Java', 'javaLogo'],
        [pythonLogo, 'Python', 'pythonLogo'],
        [phpLogo, 'PHP', 'phpLogo'],
        [cLogo, 'C#', 'cLogo'],
        [javascriptLogo, 'Javascript', 'javascriptLogo'],
        [rubyLogo, 'Ruby', 'rubyLogo'],
        [goLogo, 'Go', 'goLogo'],
        [xMark, 'Not Selected']
    ];

    const databaseTech = [
        [mysqlLogo, 'MySQL', 'mysql logo'],
        [mongodbLogo, 'MongoDB', 'mongodb logo'],
        [nosqlLogo, 'NoSQL', 'no sql logo'],
        [firebaseLogo, 'Firebase', 'firebase logo'],
        [sqlserverLogo, 'SQLServer', 'sql server logo'],
        [postgresqlLogo, 'PostgreSQL', 'postgresql logo'],
        [xMark, 'Not Selected']
    ];

    var finalWebFrontend    = sessionStorage.getItem("finalTechStackWF");
    var finalMobileFrontend = sessionStorage.getItem("finalTechStackMF");
    var finalBackend        = sessionStorage.getItem("finalTechStackB");
    var finalDatabase       = sessionStorage.getItem("finalTechStackD");
    var stackType           = sessionStorage.getItem("stackType")

    const [frontendWeb, setFrontendWeb]       = React.useState(5);
    const [frontendMobile, setFrontendMobile] = React.useState(6);
    const [backend, setBackend]               = React.useState(7);
    const [database, setDatabase]             = React.useState(6);

    const [viewWebStack, setViewWebStack]     = React.useState(true);
    const [viewMobStack, setViewMobStack]     = React.useState(true);

    React.useEffect(() => {
        for (var i = 0; i < frontendTech.length; i++) {
            if (frontendTech[i][1] === finalWebFrontend) {
                setFrontendWeb(i);
            }
        }
        for (var j = 0; j < frontendMobileTech.length; j++) {
            if (frontendMobileTech[j][1] === finalMobileFrontend) {
                setFrontendMobile(j);
            }
        }
        for (var k = 0; k < backendTech.length; k++) {
            if (backendTech[k][1] === finalBackend) {
                setBackend(k);
            }
        }
        for (var l = 0; l < databaseTech.length; l++) {
            if (databaseTech[l][1] === finalDatabase) {
                setDatabase(l);
            }
        }
        getUserDetails();

        if (stackType === '1') {
            setViewMobStack(true)
            setViewWebStack(false)
        }
        if (stackType === '2') {
            setViewMobStack(false)
            setViewWebStack(true)
        }
        if (stackType === '3') {
            setViewMobStack(true)
            setViewWebStack(true)
        }
    }, [finalBackend])

    React.useEffect(() => {
        getUserDetails();
    })

    //hook to set state if the user has preferred technologies or not
    const [preferredTechnologies, setPreferredTechnologies]     = React.useState(false);
    //hooks to store each preferred technologies 
    const [preferredFrontendMobile, setPreferredFrontendMobile] = React.useState("");
    const [preferredFrontendWeb, setPreferredFrontendWeb]       = React.useState("");
    const [preferredBackend, setPreferredBackend]               = React.useState("");
    const [preferredDatabase, setPreferredDatabase]             = React.useState("");

    const [preferredPercentagesWF, setPreferredPercentagesWF]   = React.useState(null);
    const [preferredPercentagesMF, setPreferredPercentagesMF]   = React.useState(null);
    const [preferredPercentagesB, setPreferredPercentagesB]     = React.useState(null);
    const [preferredPercentagesD, setPreferredPercentagesD]     = React.useState(null);

    function getPreferredTechPercentages() {
        axios.post('/getPreferredTechPercentages', {
            preferredFrontendWebTech: preferredFrontendWeb,
            preferredFrontendMobileTech: preferredFrontendMobile,
            preferredBackendTech: preferredBackend,
            preferredDatabaseTech: preferredDatabase,
        })
            .then(function (response) {
                setPreferredPercentagesWF(() => (response.data["1"]));
                setPreferredPercentagesMF(() => (response.data["2"]));
                setPreferredPercentagesB(()  => (response.data["3"]));
                setPreferredPercentagesD(()  => (response.data["4"]));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const docRef = doc(firestoreDatabase, "UserTechInfo", user);
    const getUserDetails = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPreferredFrontendMobile(docSnap.data().frontendMobile)
            setPreferredFrontendWeb(docSnap.data().frontendWeb)
            setPreferredBackend(docSnap.data().backend)
            setPreferredDatabase(docSnap.data().database)
            getPreferredTechPercentages();
        } else {
            setPreferredTechnologies(true);
        }
    }

    const [preferredFrontendWebIndex, setPreferredFrontendWebIndex]       = React.useState(5);
    const [preferredFrontendMobileIndex, setPreferredFrontendMobileIndex] = React.useState(6);
    const [preferredBackendIndex, setPreferredBackendIndex]               = React.useState(7);
    const [preferredDatabaseIndex, setPreferredDatabaseIndex]             = React.useState(6);

    React.useEffect(() => {
        for (var i = 0; i < frontendMobileTech.length; i++) {
            if (frontendMobileTech[i][1] === preferredFrontendMobile) {
                setPreferredFrontendMobileIndex(i);
            }
        }
        for (var j = 0; j < frontendTech.length; j++) {
            if (frontendTech[j][1] === preferredFrontendWeb) {
                setPreferredFrontendWebIndex(j);
            }
        }
        for (var k = 0; k < backendTech.length; k++) {
            if (backendTech[k][1] === preferredBackend) {
                setPreferredBackendIndex(k);
            }
        }
        for (var l = 0; l < databaseTech.length; l++) {
            if (databaseTech[l][1] === preferredDatabase) {
                setPreferredDatabaseIndex(l);
            }
        }
    })

    return (
        <div className='bk2'>
            <NavBar uidValue={user} />
            <div className='Contentt'>
                <div className='mainPageContent2' >
                    <div className='text1'>
                        <h3 style={{ textAlign: 'center', paddingTop: '30px', fontFamily: 'calibri', color: '#037ED7', fontSize: '35px' }}> Suitable Stack</h3>
                    </div>
                    {viewWebStack && (
                        <div style={{ marginTop:'5%',marginLeft:'17%',float: 'left' }}>
                            <p style={{fontWeight:'bold'}}>Web Frontend</p>
                            <img src={frontendTech[frontendWeb][0]} width={100} />
                            <p>{frontendTech[frontendWeb][1]} </p>
                        </div>
                    )}
                    {viewMobStack && (
                        <div style={{marginTop:'5%', marginRight:'17%',float: 'right' }}>
                            <p style={{fontWeight:'bold'}}>Mobile Frontend</p>
                            <img src={frontendMobileTech[frontendMobile][0]} width={100} />
                            <p>{frontendMobileTech[frontendMobile][1]} </p>
                        </div>
                    )}
                    <br />
                    <div style={{marginBottom:'5%', float: 'left', marginTop:"32%", marginLeft:'17%', position: 'absolute' }}>
                        <p style={{fontWeight:'bold'}}>Backend</p>
                        <img src={backendTech[backend][0]} width={100} />
                        <p>{backendTech[backend][1]} </p>
                    </div>
                    <div style={{ marginBottom:'5%', float: 'right', marginTop:"32%", marginRight:'20%', right: 0, position: 'absolute' }}>
                        <p style={{fontWeight:'bold'}}>Database</p>
                        <img src={databaseTech[database][0]} width={100} />
                        <p>{databaseTech[database][1]} </p>
                    </div>
                </div>

                <div className='mainPageContent3' >
                    <div className='text1'>
                        <h3 style={{ textAlign: 'center', paddingTop: '30px', marginLeft:'30%', fontFamily: 'calibri', color: '#037ED7', fontSize: '35px',position:'absolute' }}> User Preferred Stack</h3>
                    </div>
                    {!preferredTechnologies && (
                        <div>
                            {viewWebStack && (
                                <div style={{ marginTop:'15%', marginLeft:'17%' , position: 'absolute'}}>
                                    <p style={{fontWeight:'bold'}}>Web Frontend</p>
                                    <img src={frontendTech[preferredFrontendWebIndex][0]} width={100} />
                                    <p style={{marginBottom:'-1%'}}>{frontendTech[preferredFrontendWebIndex][1]} </p>
                                    <p style={{fontWeight:'bold', paddingTop:'0%', color: '#037ED7'}}> Accuracy: {preferredPercentagesWF} % </p>
                                </div>
                            )}
                            {viewMobStack && (
                                <div style={{ marginTop:'15%', marginLeft:'65%',position: 'absolute' }}>
                                    <p style={{fontWeight:'bold'}}>Mobile Frontend</p>
                                    <img src={frontendMobileTech[preferredFrontendMobileIndex][0]} width={100} />
                                    <p style={{marginTop:'18%', marginBottom:'-1%'}}>{frontendMobileTech[preferredFrontendMobileIndex][1]} </p>
                                    <p style={{fontWeight:'bold', color: '#037ED7'}}> Accuracy:  {preferredPercentagesMF} % </p>
                                </div>
                            )}
                            <br />
                            <div style={{  position: 'absolute',marginTop:'46%', marginLeft:'17%'}}>
                                <p style={{fontWeight:'bold'}}>Backend</p>
                                <img src={backendTech[preferredBackendIndex][0]} width={100} />
                                <p style={{marginTop:'-1%', marginBottom:'-1%'}}>{backendTech[preferredBackendIndex][1]} </p>
                                <p style={{fontWeight:'bold', color: '#037ED7'}}> Accuracy: {preferredPercentagesB} % </p>
                            </div>
                            <div style={{  position: 'absolute',marginTop:'46%', marginLeft:'65%' }}>
                                <p style={{fontWeight:'bold'}}>Database</p>
                                <img src={databaseTech[preferredDatabaseIndex][0]} width={100} />
                                <p style={{marginTop:'40%',marginBottom:'-1%'}}>{databaseTech[preferredDatabaseIndex][1]} </p>
                                <p style={{paddingTop:'2%',fontWeight:'bold', color: '#037ED7'}}> Accuracy: {preferredPercentagesD} %  </p>
                            </div>
                        </div>
                    )}
                    {preferredTechnologies && (
                        <p> NO PREFERRED TECH </p>
                    )}
                </div>
            </div>

            <div className='bkimage'>
                <img src={output} width="350px" />
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
                    <br />
                    <br />
                    <p className='copy2'> Copyright © All rights reserved </p>
                </div>
            </div>
            <Feedback/>
        </div>

    )
}
