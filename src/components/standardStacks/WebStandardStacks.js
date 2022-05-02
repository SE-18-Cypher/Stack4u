import React from 'react'

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
import expressLogo from './../../resources/images/techpage/backend/express.png';

import mysqlLogo from './../../resources/images/techpage/database/mysql.png';
import mongodbLogo from './../../resources/images/techpage/database/mongoDB.png';
import firebaseLogo from './../../resources/images/techpage/database/firebase.png';
import nosqlLogo from './../../resources/images/techpage/database/nosql.png';
import sqlserverLogo from './../../resources/images/techpage/database/sqlserver.png';
import postgresqlLogo from './../../resources/images/techpage/database/postgresql.png';

import './WebStandardStacks.css'
import { Paper } from '@mui/material';
import NavBar from '../navBar/NavBar';

export default function WebStandardStacks() {
    const user = sessionStorage.getItem("user");
    return (
        <div className='mainContainerWebSS' >
            <NavBar uidValue={user} />
            <div style={{ position: 'relative' }}>
                <div className="eachTechStack">
                    <br />
                    <h4> MEAN STACK </h4>
                    <br />
                    <table style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        <thead>
                            <tr>
                                <td>
                                    <img src={mongodbLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={expressLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={angularLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={nodeLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> MongoDB </p>
                                </td>
                                <td>
                                    <p> ExpressJs </p>
                                </td>
                                <td>
                                    <p> AngularJs </p>
                                </td>
                                <td>
                                    <p> NodeJs </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <br />
                <br />
                <div className="eachTechStack">
                    <br />
                    <h4> MERN STACK </h4>
                    <br />
                    <table style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        <thead>
                            <tr>
                                <td>
                                    <img src={mongodbLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={expressLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={reactLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={nodeLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> MongoDB </p>
                                </td>
                                <td>
                                    <p> ExpressJs </p>
                                </td>
                                <td>
                                    <p> ReactJs </p>
                                </td>
                                <td>
                                    <p> NodeJs </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="eachTechStack">
                    <br />
                    <h4> MEVN STACK </h4>
                    <br />
                    <table style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                        <thead>
                            <tr>
                                <td>
                                    <img src={mongodbLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={expressLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={vueLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                                <td>
                                    <img src={nodeLogo} alt='logo' width={120} style={{ margin: 20 }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p> MongoDB </p>
                                </td>
                                <td>
                                    <p> ExpressJs </p>
                                </td>
                                <td>
                                    <p> VueJs </p>
                                </td>
                                <td>
                                    <p> NodeJs </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}
