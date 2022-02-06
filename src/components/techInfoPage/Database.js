import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Paper, Skeleton } from '@mui/material';

import mysqlLogo from './../../resources/images/techpage/database/mysql.png';
import mongodbLogo from './../../resources/images/techpage/database/mongoDB.png';
import firebaseLogo from './../../resources/images/techpage/database/firebase.png';
import nosqlLogo from './../../resources/images/techpage/database/nosql.png';
import sqlserverLogo from './../../resources/images/techpage/database/sqlserver.png';
import postgresqlLogo from './../../resources/images/techpage/database/postgresql.png';

export default function Database() {
    const content = [
        [mysqlLogo,'MySQL',"MySQL is an open-source relational database management system. Its name is a combination of 'My', the name of co-founder Michael Widenius's daughter, and 'SQL', the abbreviation for Structured Query Language.",'https://dev.mysql.com/doc/'],
        [mongodbLogo,'MongoDB','MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License','https://docs.mongodb.com/'],
        [firebaseLogo,'Firebase','Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their flagship offering for app development.','https://firebase.google.com/docs?gclsrc=aw.ds&gclid=CjwKCAiAl-6PBhBCEiwAc2GOVASDxW0zpvJ3yw6-1hnpwLBncfeOpSnWceu1RAT49JLIpIJNgNWhqxoCc2IQAvD_BwE'],
        [nosqlLogo,'NoSQL','A NoSQL database provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases.','https://docs.oracle.com/en/database/other-databases/nosql-database/'],
        [sqlserverLogo,'SQLServer','Microsoft SQL Server is a relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications','https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver15'],
        [postgresqlLogo,'PostgreSQL','PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.','https://www.postgresql.org/dpostgre']
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
        border: '2px solid #000',
        boxShadow: 24,
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
                        <img src={content[indexClicked][0]} alt='logo'  width={180} style={{float:'right',padding:20,paddingBottom:40}}/>
                        <p style={{fontWeight:'bold',fontSize:40}}> {content[indexClicked][1]} </p>
                        <p style={{textAlign:'justify'}}>{content[indexClicked][2]}</p> 
                        <a href={content[indexClicked][3]} target="_blank"  rel="noreferrer">Documentation</a>
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
                            <img src={content[0][0]} alt='logo' width={140} style={{marginTop:48,float:'left',marginLeft:30}} />
                            <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[0][1]} </h3> 
                            <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>   
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
                                <img src={content[1][0]} alt='logo' width={150} style={{marginTop:10,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[1][1]} </h3> 
                                <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>   
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
                                <img src={content[2][0]} alt='logo' width={100} style={{marginTop:29,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[2][1]} </h3> 
                                <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>   
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
                                <img src={content[3][0]} alt='logo' width={130} style={{marginTop:18,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 60,fontWeight:'bold'}}> {content[3][1]} </h3> 
                                <p style={{color:'blue', marginTop:59,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>   
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
                                <img src={content[4][0]} alt='logo' width={115} style={{marginTop:30,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[4][1]} </h3> 
                                <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>   
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
                                <img src={content[5][0]} alt='logo' width={120} style={{marginTop:20,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[5][1]} </h3> 
                                <p style={{color:'blue', marginTop:48,float:'right',textDecoration:'underline',textDecorationColor:'blue'}}>Click to view {'->'}</p>   
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
