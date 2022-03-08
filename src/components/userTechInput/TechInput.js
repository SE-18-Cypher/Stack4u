import React from 'react';
import './TechInput.css';
import bg from './../../resources/images/image.png';

import { Button } from '@mui/material';

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

export default function TechInput() {

    const frontendTech = [
        [reactLogo, 'ReactJs'],
        [angularLogo, 'AngularJs'],
        [nodeLogo, 'NodeJs'],
        [javascriptLogo, 'Javascript'],
        [vueLogo, 'VueJs']
    ];

    const frontendMobileTech = [
        [reactLogo, 'React Native'],
        [angularMobileLogo, 'Mobile Angular UI'],
        [flutterLogo, 'Flutter'],
        [ionicLogo, 'Ionic'],
        [xamarinLogo, 'Xamarin'],
        [jqueryLogo, 'Jquery']
    ];

    const backendTech = [
        [javaLogo, 'Java'],
        [pythonLogo, 'Python'],
        [phpLogo, 'PHP'],
        [cLogo, 'C#'],
        [javascriptLogo, 'Javascript'],
        [rubyLogo, 'Ruby'],
        [goLogo, 'Go']
    ];

    const databaseTech = [
        [mysqlLogo,'MySQL',],
        [mongodbLogo,'MongoDB'],
        [nosqlLogo,'NoSQL'],
        [sqlserverLogo,'SQLServer'],
        [postgresqlLogo,'PostgreSQL']
    ];

    const [frontendView, setFrontendView] = React.useState(true);               //to view the web frontend technologies
    const [mobileFrontendView, setMobileFrontendView] = React.useState(false);   //to view the mobile frontend technologies
    const [backendView, setBackendView] = React.useState(false);                //to view the backend technologies
    const [databaseView, setDatabaseView] = React.useState(false);              //to view the database technologies

    function switchFrontend() {
        setFrontendView(true);
        setMobileFrontendView(false);
        setBackendView(false);
        setDatabaseView(false);
    }

    function switchMobileFrontend() {
        setFrontendView(false);
        setMobileFrontendView(true);
        setBackendView(false);
        setDatabaseView(false);
    }

    function switchBackend() {
        setFrontendView(false);
        setMobileFrontendView(false);
        setBackendView(true);
        setDatabaseView(false);
    }

    function switchDatabase() {
        setFrontendView(false);
        setMobileFrontendView(false);
        setBackendView(false);
        setDatabaseView(true);
    }

    const [confirm, setConfirm] = React.useState(false);  //to disable the confirm button 

    const [selectedFrontendTech, setSelectedFrontendTech] = React.useState(1);
    const [selectedMobileFrontendTech, setSelectedMobileFrontendTech] = React.useState(1);
    const [selectedBackendTech, setSelectedBackendTech] = React.useState(1);
    const [selectedDatabaseTech, setSelectedDatabaseTech] = React.useState(1);

    return (
        <div>
            <div className='backgroundColor' />
            <div className="techInputHeaderImage" style={{ backgroundImage: `url(${bg})` }}>
                <h2 style={{ fontWeight: 'bold', fontFamily: 'calibri', color: 'white' }}>SELECT YOUR PREFERRED TECHNOLOGIES</h2>
            </div>
            <div>
                <div className='selectedContainer'>
                    <h4 style={{ textAlign: 'center', padding: 10 }}> CHOSEN TECHNOLOGIES</h4>
                    <br/>
                    <div style={{float:'left',marginLeft:'10%'}}>
                        <h5 >Frontend</h5>
                        <h6>Web</h6> 
                        <br/>
                        <img src={frontendTech[selectedFrontendTech][0]} width={125}/>
                        <br/>
                        <h6 style={{marginTop:'15%'}}>Mobile</h6>
                        <br/>
                        <img src={frontendMobileTech[selectedMobileFrontendTech][0]} width={125}/>
                    </div>
                    <div style={{float:'left' ,marginLeft:'10%'}}>
                        <h5>Backend</h5>
                        <img src={frontendTech[selectedBackendTech][0]} width={125} style={{marginTop:'80%'}} />
                    </div>
                    <div style={{float:'left' ,marginLeft:'10%'}}>
                        <h5>Database</h5>
                        <img src={frontendTech[selectedDatabaseTech][0]}width={125} style={{marginTop:'80%'}} />
                    </div>
                </div>
                <div className='chooseTechnologiesContainer'>
                    <div style={{ float: 'right' }}>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchFrontend}> <p className={frontendView ? "activeType" : "notActiveType"}> WEB FRONTEND </p> </Button>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchMobileFrontend}> <p className={mobileFrontendView ? "activeType" : "notActiveType"}> MOBILE FRONTEND </p> </Button>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchBackend} > <p className={backendView ? "activeType" : "notActiveType"}> BACKEND  </p> </Button>
                        <Button style={{ marginLeft: 10 }} onClick={switchDatabase}> <p className={databaseView ? "activeType" : "notActiveType"}> DATABASE </p> </Button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <table className='technologiesDisplay'>
                        {/* to view all the front end technologies */}
                        {!mobileFrontendView && !backendView && !databaseView && (
                            <thead>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={()=> setSelectedFrontendTech(0)} className={selectedFrontendTech===0 ? "selectedTech":"notSelectedTech"}> <img src={frontendTech[0][0]} width={125} /> </button>
                                        <p>{frontendTech[0][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                    <button onClick={()=> setSelectedFrontendTech(1)} className={selectedFrontendTech===1 ? "selectedTech":"notSelectedTech"}> <img src={frontendTech[1][0]} width={125} /> </button>
                                        <p>{frontendTech[1][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                    <button onClick={()=> setSelectedFrontendTech(2)} className={selectedFrontendTech===2 ? "selectedTech":"notSelectedTech"}> <img src={frontendTech[2][0]} width={125} /> </button>
                                        <p>{frontendTech[2][1]}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                    <button onClick={()=> setSelectedFrontendTech(3)} className={selectedFrontendTech===3 ? "selectedTech":"notSelectedTech"}> <img src={frontendTech[3][0]} width={125} /> </button>
                                        <p>{frontendTech[3][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                    <button onClick={()=> setSelectedFrontendTech(4)} className={selectedFrontendTech===4 ? "selectedTech":"notSelectedTech"}> <img src={frontendTech[4][0]} width={125} /> </button>
                                        <p>{frontendTech[4][1]}</p>
                                    </td>
                                </tr>
                            </thead>
                        )}
                        {/* to view all the mobile frontend tech  */}
                        {!frontendView && !backendView && !databaseView && (
                            <thead>
                            <tr>
                                <td style={{ padding: 30 }}>
                                    <button onClick={()=> setSelectedMobileFrontendTech(0)} className={selectedMobileFrontendTech===0 ? "selectedTech":"notSelectedTech"}> <img src={frontendMobileTech[0][0]} width={125} /> </button>
                                    <p>{frontendMobileTech[0][1]}</p>
                                </td>
                                <td style={{ padding: 30 }}>
                                <button onClick={()=> setSelectedMobileFrontendTech(1)} className={selectedMobileFrontendTech===1 ? "selectedTech":"notSelectedTech"}> <img src={frontendMobileTech[1][0]} width={125} /> </button>
                                    <p style={{marginTop:'30%'}}>{frontendMobileTech[1][1]}</p>
                                </td>
                                <td style={{ padding: 30 }}>
                                <button onClick={()=> setSelectedMobileFrontendTech(2)} className={selectedMobileFrontendTech===2 ? "selectedTech":"notSelectedTech"}> <img src={frontendMobileTech[2][0]} width={125} /> </button>
                                    <p style={{marginTop:'20%'}}>{frontendMobileTech[2][1]}</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: 30 }}>
                                <button onClick={()=> setSelectedMobileFrontendTech(3)} className={selectedMobileFrontendTech===3 ? "selectedTech":"notSelectedTech"}> <img src={frontendMobileTech[3][0]} width={125} /> </button>
                                    <p>{frontendMobileTech[3][1]}</p>
                                </td>
                                <td style={{ padding: 30 }}>
                                <button onClick={()=> setSelectedMobileFrontendTech(4)} className={selectedMobileFrontendTech===4 ? "selectedTech":"notSelectedTech"}> <img src={frontendMobileTech[4][0]} width={125} /> </button>
                                    <p style={{marginTop:'10%'}}>{frontendMobileTech[4][1]}</p>
                                </td>
                                <td style={{ padding: 30 }}>
                                <button onClick={()=> setSelectedMobileFrontendTech(5)} className={selectedMobileFrontendTech===5 ? "selectedTech":"notSelectedTech"}> <img src={frontendMobileTech[5][0]} width={125} /> </button>
                                    <p>{frontendMobileTech[5][1]}</p>
                                </td>
                            </tr>
                        </thead>
                        )}
                        {/* to view all the backend tech  */}
                        {!frontendView && !mobileFrontendView && !databaseView && (
                            <p> B </p>
                        )}
                        {/* to view all the database tech  */}
                        {!backendView && !frontendView && !mobileFrontendView &&(
                            <p> D </p>
                        )}
                    </table>
                </div>
            </div>
            <div className='choiceButtons'>
                <Button variant='contained' style={{ margin: 10, padding: 5 }} > Skip </Button>
                <Button variant='contained' style={{ margin: 10, padding: 5 }} disabled={!confirm} > Confirm </Button>
            </div>
        </div >
    )
}   
