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

import xMark from './../../resources/images/xmark.png';

import { useNavigate } from 'react-router';

export default function TechInput() {

    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user === '0') {
            navigate('/access_error')
        }
    },)


    const frontendTech = [
        [reactLogo, 'ReactJs','reactLogo'],
        [angularLogo, 'AngularJs','angularLogo'],
        [nodeLogo, 'NodeJs','nodeLogo'],
        [javascriptLogo, 'Javascript','javascriptLogo'],
        [vueLogo, 'VueJs','vueLogo'],
        [xMark, 'Not Selected']
    ];

    const frontendMobileTech = [
        [reactLogo, 'React Native','reactLogo'],
        [angularMobileLogo, 'Mobile Angular UI','angularMobileLogo'],
        [flutterLogo, 'Flutter','flutter Logo'],
        [ionicLogo, 'Ionic','ionic logo'],
        [xamarinLogo, 'Xamarin','xamarin logo'],
        [jqueryLogo, 'Jquery','jquery logo'],
        [xMark, 'Not Selected']
    ];

    const backendTech = [
        [javaLogo, 'Java','javaLogo'],
        [pythonLogo, 'Python','pythonLogo'],
        [phpLogo, 'PHP','phpLogo'],
        [cLogo, 'C#','cLogo'],
        [javascriptLogo, 'Javascript','javascriptLogo'],
        [rubyLogo, 'Ruby','rubyLogo'],
        [goLogo, 'Go','goLogo'],
        [xMark, 'Not Selected']
    ];

    const databaseTech = [
        [mysqlLogo, 'MySQL','mysql logo'],
        [mongodbLogo, 'MongoDB','mongodb logo'],
        [nosqlLogo, 'NoSQL','no sql logo'],
        [firebaseLogo, 'Firebase','firebase logo'],
        [sqlserverLogo, 'SQLServer','sql server logo'],
        [postgresqlLogo, 'PostgreSQL','postgresql logo'],
        [xMark, 'Not Selected']
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

    const [confirm, setConfirm] = React.useState(true);  //to disable the confirm button 
    const toggleConfirm = () => setConfirm((confirm) => !confirm);

    const [selectedFrontendTech, setSelectedFrontendTech] = React.useState(5);
    const [selectedMobileFrontendTech, setSelectedMobileFrontendTech] = React.useState(6);
    const [selectedBackendTech, setSelectedBackendTech] = React.useState(7);
    const [selectedDatabaseTech, setSelectedDatabaseTech] = React.useState(6);
 
    React.useEffect(() => {
        if (selectedFrontendTech === 5 || selectedMobileFrontendTech === 6 || selectedBackendTech === 7 || selectedDatabaseTech === 6){
            toggleConfirm();
        }
    }, [selectedFrontendTech,selectedMobileFrontendTech,selectedBackendTech,selectedDatabaseTech])
    
    function getTechInput(){
        console.log(frontendTech[selectedFrontendTech][1])
        console.log(frontendMobileTech[selectedMobileFrontendTech][1])
        console.log(backendTech[selectedBackendTech][1])
        console.log(databaseTech[selectedDatabaseTech][1])

        navigate('/home');
    }

    return (
        <div>
            <div className='backgroundColor' />
            <div className="techInputHeaderImage" style={{ backgroundImage: `url(${bg})` }}>
                <h2 style={{ fontWeight: 'bold', fontFamily: 'calibri', color: 'white' }}>SELECT YOUR PREFERRED TECHNOLOGIES</h2>
            </div>
            <div>
                <div className='selectedContainer'>
                    <h4 style={{ textAlign: 'center', padding: 10 }}> CHOSEN TECHNOLOGIES</h4>
                    <br />
                    <div style={{ float: 'left', marginLeft: '10%' }}>
                        <h5 >Frontend</h5>
                        <h6>Web</h6>
                        <br />
                        <img src={frontendTech[selectedFrontendTech][0]} width={125} alt='selected frontend logo'/>
                        <br />
                        <h6 style={{ marginTop: '15%' }}>Mobile</h6>
                        <br />
                        <img src={frontendMobileTech[selectedMobileFrontendTech][0]} width={125} alt = 'selected frontend mobile logo'/>
                    </div>
                    <div style={{ float: 'left', marginLeft: '10%' }}>
                        <h5>Backend</h5>
                        <img src={backendTech[selectedBackendTech][0]} width={125} style={{ marginTop: '80%' }} alt='selected backend logo'/>
                    </div>
                    <div style={{ float: 'left', marginLeft: '10%' }}>
                        <h5>Database</h5>
                        <img src={databaseTech[selectedDatabaseTech][0]} width={125} style={{ marginTop: '80%' }} alt='selected database logo'/>
                    </div>
                </div>
                <div className='chooseTechnologiesContainer'>
                    <div style={{ float: 'right' }}>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchFrontend}> <p className={frontendView ? "activeType" : "notActiveType"}> WEB FRONTEND </p> </Button>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchMobileFrontend}> <p className={mobileFrontendView ? "activeType" : "notActiveType"}> MOBILE FRONTEND </p> </Button>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchBackend} > <p className={backendView ? "activeType" : "notActiveType"}> BACKEND  </p> </Button>
                        <Button style={{ marginLeft: 10, marginRight: 10 }} onClick={switchDatabase}> <p className={databaseView ? "activeType" : "notActiveType"}> DATABASE </p> </Button>
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
                                        <button onClick={() => setSelectedFrontendTech(0)} className={selectedFrontendTech === 0 ? "selectedTech" : "notSelectedTech"}> <img src={frontendTech[0][0]} width={125} alt={frontendTech[0][2]} /> </button>
                                        <p>{frontendTech[0][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedFrontendTech(1)} className={selectedFrontendTech === 1 ? "selectedTech" : "notSelectedTech"}> <img src={frontendTech[1][0]} width={125} alt={frontendTech[1][2]}/> </button>
                                        <p>{frontendTech[1][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedFrontendTech(2)} className={selectedFrontendTech === 2 ? "selectedTech" : "notSelectedTech"}> <img src={frontendTech[2][0]} width={125} alt={frontendTech[2][2]}/> </button>
                                        <p>{frontendTech[2][1]}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedFrontendTech(3)} className={selectedFrontendTech === 3 ? "selectedTech" : "notSelectedTech"}> <img src={frontendTech[3][0]} width={125} alt={frontendTech[3][2]}/> </button>
                                        <p>{frontendTech[3][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedFrontendTech(4)} className={selectedFrontendTech === 4 ? "selectedTech" : "notSelectedTech"}> <img src={frontendTech[4][0]} width={125} alt={frontendTech[4][2]}/> </button>
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
                                        <button onClick={() => setSelectedMobileFrontendTech(0)} className={selectedMobileFrontendTech === 0 ? "selectedTech" : "notSelectedTech"}> <img src={frontendMobileTech[0][0]} width={125} alt={frontendMobileTech[0][2]}/> </button>
                                        <p>{frontendMobileTech[0][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedMobileFrontendTech(1)} className={selectedMobileFrontendTech === 1 ? "selectedTech" : "notSelectedTech"}> <img src={frontendMobileTech[1][0]} width={125} alt={frontendMobileTech[1][2]}/> </button>
                                        <p style={{ marginTop: '30%' }}>{frontendMobileTech[1][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedMobileFrontendTech(2)} className={selectedMobileFrontendTech === 2 ? "selectedTech" : "notSelectedTech"}> <img src={frontendMobileTech[2][0]} width={125} alt={frontendMobileTech[2][2]}/> </button>
                                        <p style={{ marginTop: '20%' }}>{frontendMobileTech[2][1]}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedMobileFrontendTech(3)} className={selectedMobileFrontendTech === 3 ? "selectedTech" : "notSelectedTech"}> <img src={frontendMobileTech[3][0]} width={125} alt={frontendMobileTech[3][2]}/> </button>
                                        <p>{frontendMobileTech[3][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedMobileFrontendTech(4)} className={selectedMobileFrontendTech === 4 ? "selectedTech" : "notSelectedTech"}> <img src={frontendMobileTech[4][0]} width={125} alt={frontendMobileTech[4][2]}/> </button>
                                        <p style={{ marginTop: '10%' }}>{frontendMobileTech[4][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedMobileFrontendTech(5)} className={selectedMobileFrontendTech === 5 ? "selectedTech" : "notSelectedTech"}> <img src={frontendMobileTech[5][0]} width={125} alt={frontendMobileTech[5][2]}/> </button>
                                        <p>{frontendMobileTech[5][1]}</p>
                                    </td>
                                </tr>
                            </thead>
                        )}
                        {/* to view all the backend tech  */}
                        {!frontendView && !mobileFrontendView && !databaseView && (
                            <thead>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedBackendTech(0)} className={selectedBackendTech === 0 ? "selectedTech" : "notSelectedTech"}> <img src={backendTech[0][0]} width={125} alt={backendTech[0][2]}/> </button>
                                        <p>{backendTech[0][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedBackendTech(1)} className={selectedBackendTech === 1 ? "selectedTech" : "notSelectedTech"}> <img src={backendTech[1][0]} width={125} alt={backendTech[1][2]}/> </button>
                                        <p>{backendTech[1][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedBackendTech(2)} className={selectedBackendTech === 2 ? "selectedTech" : "notSelectedTech"}> <img src={backendTech[2][0]} width={125} alt={backendTech[2][2]}/> </button>
                                        <p>{backendTech[2][1]}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedBackendTech(3)} className={selectedBackendTech === 3 ? "selectedTech" : "notSelectedTech"}> <img src={backendTech[3][0]} width={125} alt={backendTech[3][2]}/> </button>
                                        <p>{backendTech[3][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedBackendTech(4)} className={selectedBackendTech === 4 ? "selectedTech" : "notSelectedTech"}> <img src={backendTech[4][0]} width={125} alt={backendTech[4][2]}/> </button>
                                        <p>{backendTech[4][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedBackendTech(5)} className={selectedBackendTech === 5 ? "selectedTech" : "notSelectedTech"}> <img src={backendTech[5][0]} width={125} alt={backendTech[5][2]}/> </button>
                                        <p>{backendTech[5][1]}</p>
                                    </td>
                                </tr>
                            </thead>
                        )}
                        {/* to view all the database tech  */}
                        {!backendView && !frontendView && !mobileFrontendView && (
                            <thead>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedDatabaseTech(0)} className={selectedDatabaseTech === 0 ? "selectedTech" : "notSelectedTech"}> <img src={databaseTech[0][0]} width={125} alt={databaseTech[0][2]}  /> </button>
                                        <p>{databaseTech[0][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedDatabaseTech(1)} className={selectedDatabaseTech === 1 ? "selectedTech" : "notSelectedTech"}> <img src={databaseTech[1][0]} width={125} alt={databaseTech[1][2]}/> </button>
                                        <p>{databaseTech[1][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedDatabaseTech(2)} className={selectedDatabaseTech === 2 ? "selectedTech" : "notSelectedTech"}> <img src={databaseTech[2][0]} width={125} alt={databaseTech[2][2]}/> </button>
                                        <p>{databaseTech[2][1]}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedDatabaseTech(3)} className={selectedDatabaseTech === 3 ? "selectedTech" : "notSelectedTech"}> <img src={databaseTech[3][0]} width={100} alt={databaseTech[3][2]}/> </button>
                                        <p>{databaseTech[3][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedDatabaseTech(4)} className={selectedDatabaseTech === 4 ? "selectedTech" : "notSelectedTech"}> <img src={databaseTech[4][0]} width={125} alt={databaseTech[4][2]}/> </button>
                                        <p>{databaseTech[4][1]}</p>
                                    </td>
                                    <td style={{ padding: 30 }}>
                                        <button onClick={() => setSelectedDatabaseTech(5)} className={selectedDatabaseTech === 5 ? "selectedTech" : "notSelectedTech"}> <img src={databaseTech[5][0]} width={125} alt={databaseTech[5][2]}/> </button>
                                        <p>{databaseTech[5][1]}</p>
                                    </td>
                                </tr>
                            </thead>
                        )}
                    </table>
                </div>
            </div>
            <div className='choiceButtons'>
                <Button variant='contained' style={{ margin: 10, padding: 5 }} onClick={() => navigate("/home")}> Skip </Button>
                <Button variant='contained' style={{ margin: 10, padding: 5 }} disabled={confirm}  onClick={() => getTechInput()}> Confirm </Button>
            </div>
        </div >
    )
}   
