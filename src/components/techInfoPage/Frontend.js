import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Paper, Skeleton } from '@mui/material';

import reactLogo from './../../resources/images/techpage/frontend/reactLogo.png';
import flutterLogo from './../../resources/images/techpage/frontend/flutter.png';
import vueLogo from './../../resources/images/techpage/frontend/vue.png';
import angularLogo from './../../resources/images/techpage/frontend/angular.png';
import ionicLogo from './../../resources/images/techpage/frontend/ionic.png';

export default function Frontend() {
    const content = [
        [reactLogo,'ReactJs','ReactJs is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies. ReactJs can be used as a base in the development web applications.','https://reactjs.org/docs/getting-started.html'], 
        [flutterLogo,'Flutter','Flutter is an open-source UI software development kit created by Google. It is used to develop cross platform applications for Android, iOS, Linux, Mac, Windows, Google Fuchsia, Web platform, and the web from a single codebase.','https://docs.flutter.dev/'], 
        [vueLogo,'VueJs','Vue.js is an open-source model-view-viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.','https://vuejs.org/v2/guide/'], 
        [angularLogo,'Angular','AngularJS was a JavaScript-based open-source front-end web framework for developing single-page applications. It was maintained mainly by Google and a community of individuals and corporations.','https://docs.angularjs.org/guide'],
        [ionicLogo,'Ionic','Ionic is a complete open-source SDK for hybrid mobile app development created by Max Lynch, Ben Sperry, and Adam Bradley of Drifty Co. in 2013.','https://ionicframework.com/docs'],
        [reactLogo,'React Native','React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for mobile by enabling developers to use the React framework along with native platform capabilities','https://reactnative.dev/docs/getting-started'], 
    ];

    const [view, setView] = React.useState(false);
    const toggleView = () => setView((view) => !view);

    const [indexClicked, setIndexClicked] = React.useState(0);

    const [loaded, setLoaded] = React.useState(false);

    setTimeout(function () {
        setLoaded(true);
    }, 2000);
    
    function openDescription(index){
        toggleView();
        setIndexClicked(index);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height:300,
        bgcolor: 'background.paper',
        border: '0',
        boxShadow: 10,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={view}
                onClose={toggleView}
            >
                <Box sx={style}>
                    <div class="clearfix">
                        <img src={content[indexClicked][0]} alt='logo'  width={200} style={{float:'right',paddingLeft:'15px'}}/>
                        <p style={{fontWeight:'bold',fontSize:35}}> {content[indexClicked][1]} </p>
                        <p style={{textAlign:'justify'}}>{content[indexClicked][2]}</p> 
                        <a href={content[indexClicked][3]} target="_blank" rel="noreferrer" style={{fontFamily:'calibri', color:'#037ED7',fontSize:'17px'}} >Documentation</a>
                    </div>    
                </Box>
            </Modal>

            <table style={{marginRight:'auto',marginLeft:'auto'}}>
            <thead>
            <tr>
                <td>
                    <div style={{margin:50}}>
                        { loaded ? (
                            <Paper elevation={24} onClick={() => openDescription(0)} className="eachTechContent"> 
                                <img src={content[0][0]} alt='logo' width={150} style={{marginTop:18,float:'left',marginLeft:33}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[0][1]} </h3> 
                                {/* <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>    */}
                            </Paper> 
                        ) : (
                            <Skeleton variant="rectangular" width={330} height={180} />
                        )}  
                    </div>
                </td>
                <td>
                    <div style={{margin:50}}>
                        { loaded ? (
                            <Paper elevation={24} onClick={() => openDescription(1)} className="eachTechContent"> 
                                <img src={content[1][0]} alt='logo' width={150} style={{marginTop:30,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[1][1]} </h3> 
                                {/* <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>    */}
                            </Paper> 
                        ) : (
                            <Skeleton variant="rectangular" width={330} height={180} />
                        )}  
                    </div>
                </td>
                <td>
                    <div style={{margin:50}}>
                        { loaded ? (
                            <Paper elevation={24} onClick={() => openDescription(2)} className="eachTechContent"> 
                                <img src={content[2][0]} alt='logo' width={140} style={{marginTop:29,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[2][1]} </h3> 
                                {/* <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>    */}
                            </Paper> 
                        ) : (
                            <Skeleton variant="rectangular" width={330} height={180} />
                        )}
                    </div>  
                </td>
            </tr>
            <tr>
                <td>
                    <div style={{margin:50}}>
                        { loaded ? (
                            <Paper elevation={24} onClick={() => openDescription(3)} className="eachTechContent"> 
                                <img src={content[3][0]} alt='logo' width={135} style={{marginTop:20,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[3][1]} </h3> 
                                {/* <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>    */}
                            </Paper>    
                        ) : (
                            <Skeleton variant="rectangular" width={330} height={180} />
                        )}
                    </div>
                </td>
                <td>
                    <div style={{margin:50}}>
                        { loaded ? (
                             <Paper elevation={24} onClick={() => openDescription(4)} className="eachTechContent"> 
                                <img src={content[4][0]} alt='logo' width={125} style={{marginTop:30,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[4][1]} </h3> 
                                {/* <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>    */}
                            </Paper>  
                        ) : (
                            <Skeleton variant="rectangular" width={330} height={180} />
                        )}
                    </div>
                </td>
                <td>
                    <div style={{margin:50}}>
                        { loaded ? (
                            <Paper elevation={24} onClick={() => openDescription(5)} className="eachTechContent"> 
                                <img src={content[5][0]} alt='logo' width={150} style={{marginTop:18,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 60,fontWeight:'bold'}}> {content[5][1]} </h3> 
                                {/* <p style={{color:'blue', marginTop:25,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>    */}
                            </Paper> 
                        ) : (
                            <Skeleton variant="rectangular" width={330} height={180} />
                        )}        
                    </div>  
                </td>
            </tr>
            </thead>  
            </table>    
        </div>
    );
}