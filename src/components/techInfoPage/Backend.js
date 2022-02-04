import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Paper, Skeleton } from '@mui/material';

import javaLogo from './../../resources/images/techpage/backend/java.png';
import pythonLogo from './../../resources/images/techpage/backend/python.png';
import phpLogo from './../../resources/images/techpage/backend/php.png';
import javascriptLogo from './../../resources/images/techpage/backend/javascript.png';
import cLogo from './../../resources/images/techpage/backend/c.png';
import rubyLogo from './../../resources/images/techpage/backend/ruby.png';

export default function Backend() {
    const content = [
        [javaLogo,'Java','Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.','https://docs.oracle.com/en/java/'],
        [pythonLogo,'Python','Python is an interpreted high-level general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation. Its language constructs as well as its object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.','https://docs.python.org/3/'],
        [phpLogo,'php','PHP is a general-purpose scripting language geared towards web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994.','https://www.php.net/docs.php'],
        [javascriptLogo,'Javascript','JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
        [cLogo,'C#','C# is a general-purpose, multi-paradigm programming language. C# encompasses static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines.','https://docs.microsoft.com/en-us/dotnet/csharp/'],
        [rubyLogo,'Ruby','Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. It was designed with an emphasis on programming productivity and simplicity. In Ruby, everything is an object, including primitive data types.','https://www.ruby-lang.org/en/documentation/']
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
                        <img src={content[indexClicked][0]} alt='logo'  width={220} style={{float:'right'}}/>
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
                                <img src={content[0][0]} alt='logo' width={135} style={{marginTop:18,float:'left',marginLeft:30}} />
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
                                <img src={content[1][0]} alt='logo' width={135} style={{marginTop:30,float:'left',marginLeft:30}} />
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
                                <img src={content[2][0]} alt='logo' width={140} style={{marginTop:29,float:'left',marginLeft:30}} />
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
                                <img src={content[3][0]} alt='logo' width={150} style={{marginTop:18,float:'left',marginLeft:30}} />
                                <h3 style={{paddingTop: 70,fontWeight:'bold'}}> {content[3][1]} </h3> 
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
                            <Paper elevation={24} onClick={() => openDescription(4)} className="eachTechContent"> 
                                <img src={content[4][0]} alt='logo' width={125} style={{marginTop:30,float:'left',marginLeft:30}} />
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
                                <img src={content[5][0]} alt='logo' width={135} style={{marginTop:20,float:'left',marginLeft:30}} />
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
