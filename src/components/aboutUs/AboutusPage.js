import React from 'react';

import bg from "./../../resources/images/bg.jpeg";
import "./AboutusPage.css";
import Sadurshan from "./../../resources/images/Sadurshan.jpeg";
import madusha from "./../../resources/images/madusha.jpeg";
import Bupani from "./../../resources/images/Bupani.jpeg";
import chami from "./../../resources/images/chami.png";
import Thisaru from "./../../resources/images/Thisaru.jfif";
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NavBar from './../navBar/NavBar';


export default function AboutusPage() {

    const [viewMembers , setViewMembers] = React.useState(false)

    window.onscroll = function (e) {
        
        if (window.scrollY <= 350 ){
            setViewMembers(false)
        }
        else if (window.scrollY <= 430) {
            setViewMembers(true)
        }
    };

    console.log(viewMembers)
    
    

    return (

        <div id="contentBody" className='bk'>
        <NavBar/>
            <div className={viewMembers ? "text":"Activetext"} >
                <div className="bground" style={{ backgroundImage: `url(${bg})` }}>
                    <h2 style={{fontWeight:'bold', fontFamily: 'calibri', color: 'white'}}>About Us</h2>
                </div>
                <div className='Ourstory'>
                    <div className='container1'><h3>Our Story</h3>
                        <p>We are a group of 2nd-year undergraduates who are currently following the  BEng(Hons) Software Engineering degree at the informatics
                            Institute of Technology. As our second-year Software Development Group Project, We were asked to come up with an innovative solution
                            to solve real-world problems, covering the aspects of Data Science, Blockchain, Gaming, Cyber Security, Identity, and access
                            management with a research component and to implement that idea with the front end, back end (web/mobile).
                            his SDGP module aims to improve students' skills in coding, logical thinking, industrial replacement, teamwork, etc.
                            So , heres our innovative solution.............
                        </p>
                    </div>

                    <div className='container2'> <h3>About our Project</h3>
                        <p>In the software development industry, it's common to have new technologies, standards, and common practices change from time to time.
                            Sometimes it can be a bit harsh on new developers. When a new developer enters the industry it would be really helpful to have a tool
                            to generate a technology stack according to a specific requirement. And it also considers user preferences when generating
                            a technology stack. Based on the suggested stack user can decide on what is best for their scenario.<br></br> So as the solution, we are
                            implementing a web application named <b>“Stack4U”</b>. This application recommends the most suitable and accurate technology stack for a software requirement specification document. With the growth of technology, newer technologies are introduced which are much better
                            and more beneficial compared to the previous technologies. For a project to be successful, the chosen technology stack must be suitable
                            for the given requirement specification document. Choosing the most suitable technology stack is a challenging task, developers face
                            a lot of issues when choosing the right technologies since some developers are not experienced enough to have the knowledge to choose
                            the most suitable and correct technologies. To preserve a successful overall performance and reach their enterprise goals, groups
                            nowadays constantly want to evolve and learn new technologies.
                        </p>

                        <h5 style={{textAlign:'center', paddingTop:70}}>Scroll down {'>>>>>>'}</h5>
                    </div>
                </div>
            </div>
            <div className='profiles'>

                <div className='desc'>
                    <img className={viewMembers ? "ActiveImage":"Image"} src={Thisaru} alt="Error Logo" />
                    <h6 className='name'><b>THISARU WIKRAMASEKARA</b></h6>
                    <p className='para'>BEng(Hons) Software Engineering</p>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.location.href = 'http://google.com';

                        }}

                    > <InstagramIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.location.href = 'https://www.instagram.com/_thisaru_99/';

                        }}

                    > <FacebookIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.location.href = 'https://www.linkedin.com/in/thisaru-wickramasekara-b397301a6/';

                        }}

                    > <LinkedInIcon color="primary" /></Button>
                </div>
                <div className='desc'>
                    <img className={viewMembers ? "ActiveImage":"Image"} src={Bupani} alt="Error Logo" />
                    <h6 className='name'><b>BUPANIE THALAGALA</b></h6>
                    <p className='para'>BEng(Hons) Software Engineering</p>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.instagram.com/_bups_c/','_blank')

                        }}

                    > <InstagramIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.facebook.com/bupanie.thalagala','_blank')

                        }}

                    > <FacebookIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.linkedin.com/in/bupanie-chamathka-thalagala-041674207/','_blank')

                        }}

                    > <LinkedInIcon color="primary" /></Button>

                    <p></p>
                </div>
                <div className='desc'>
                    <img className={viewMembers ? "ActiveImage":"Image"} src={madusha} alt="Error Logo" />
                    <h6 className='name'><b>MADUSHA THUMBOWITA</b></h6>
                    <p className='para'>BEng(Hons) Software Engineering</p>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.instagram.com/madushathumbowita/','_blank')

                        }}

                    > <InstagramIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.facebook.com/madusha.thumbowita.77','_blank')

                        }}

                    > <FacebookIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.linkedin.com/in/madusha-thumbowita-28a28b1b9/','_blank')

                        }}

                    > <LinkedInIcon color="primary" /></Button>

                    <p></p>
                </div>
                <div className='desc'>
                    <img className={viewMembers ? "ActiveImage":"Image"} src={chami} alt="Error Logo" />
                    <h6 className='name'><b>CHAMIDI PERERA</b></h6>
                    <p className='para'>BEng(Hons) Software Engineering</p>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.instagram.com/_.chami.iii/','_blank')

                        }}

                    > <InstagramIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.facebook.com/chamidi.perera.39','_blank')

                        }}

                    > <FacebookIcon color="primary" id="bottom"/></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('','_blank')

                        }}

                    > <LinkedInIcon color="primary" /></Button>

                </div>
                <div className='desc'>
                    <img className={viewMembers ? "ActiveImage":"Image"} src={Sadurshan} alt="Error Logo" />
                    <h6 className='name'><b>SADURSHAN RAVINDRAN</b></h6>
                    <p className='para'>BEng(Hons) Software Engineering</p>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.instagram.com/sadurshan_ravindran/','_blank')

                        }}

                    > <InstagramIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.facebook.com/sadu.ravi.1000','_blank')

                        }}

                    > <FacebookIcon color="primary" /></Button>
                    <Button

                        onClick={(e) => {

                            e.preventDefault();

                            window.open('https://www.linkedin.com/in/sadurshan-ravindran-811540113/','_blank')

                        }}

                    > <LinkedInIcon color="primary" /></Button>
                
                                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                


                </div>

            </div>

        </div>



    );

}
