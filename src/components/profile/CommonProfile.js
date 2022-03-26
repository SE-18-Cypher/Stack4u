import React from 'react';
import './CommonProfile.css';
import { Avatar } from '@mui/material';
import NavBar from '../navBar/NavBar';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import defaultProfilePicture from '../../resources/images/logoW.png'
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import app from '../../Firebase-config';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

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


export default function CommonProfile() {
    const user = sessionStorage.getItem("user");
    const navigate = useNavigate();
    const storage = getStorage();

    const database = getFirestore(app);

    const frontendTech = [
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

    const [selectedFrontendTech, setSelectedFrontendTech] = React.useState(5);
    const [selectedMobileFrontendTech, setSelectedMobileFrontendTech] = React.useState(6);
    const [selectedBackendTech, setSelectedBackendTech] = React.useState(7);
    const [selectedDatabaseTech, setSelectedDatabaseTech] = React.useState(6);

    React.useEffect(() => {
        if (user === null) {
            navigate('/access_error')
        }
    })

    React.useEffect(() => {
        getTechnologies()
    }, [selectedBackendTech])

    const docRefTech = doc(database, "UserTechInfo", user);
    const getTechnologies = async () => {
        const docSnap = await getDoc(docRefTech);
        if (docSnap.exists()) {
            for (var i = 0; i < backendTech.length; i++) {
                if (backendTech[i][1] == docSnap.data().backend) {
                    setSelectedBackendTech(i)
                }
            }
            for (var i = 0; i < frontendTech.length; i++) {
                if (frontendTech[i][1] == docSnap.data().frontendWeb) {
                    setSelectedFrontendTech(i)
                }
            }
            for (var i = 0; i < frontendMobileTech.length; i++) {
                if (frontendMobileTech[i][1] == docSnap.data().frontendMobile) {
                    setSelectedMobileFrontendTech(i)
                }
            }
            for (var i = 0; i < databaseTech.length; i++) {
                if (databaseTech[i][1] == docSnap.data().database) {
                    setSelectedDatabaseTech(i)
                }
            }
        } else {
            console.log("No such document!");
        }
    }

    var user2 = sessionStorage.getItem("guser");
    console.log(user2)
    React.useEffect(() => {
        if (user2 === null) {
            getDownloadURL(ref(storage, 'users/' + user + '/picture.jpeg'))
                .then((url) => {
                    const img2 = document.getElementById('myimg2');
                    img2.setAttribute('src', url);
                })
                .catch((error) => {
                    console.log(error)
                });

        }
        else {
            const img2 = document.getElementById('myimg2');
            img2.setAttribute('src', user2);
            console.log(user2)
        }
    }, [])

    const [userData, setUserData] = React.useState([]);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");


    const auth = getAuth(app);
    const authUser = auth.currentUser;

    const docRef = doc(database, "Users", user);    

    const getUserDetails = async () => {
        
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserData(docSnap.data());
            setFirstName(userData.firstName);
            console.log(firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    React.useEffect(() => {
        getUserDetails();
    }, [firstName]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateUserDetails = async () => {
        await updateDoc(docRef, {
            firstName: firstName,
            lastName: lastName
        })
        Swal.fire({
            confirmButtonColor: "#2389eb",
            icon: 'success',
            title: 'User details updated Successfully' //success message
        })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '45%',
        bgcolor: 'white',
        boxShadow: 24,
        p: 2,
        borderRadius: 10
    };
    console.log(selectedFrontendTech)

    return (
        <div>
            <NavBar uidValue={user} />
            <div className="profilePage">
                <h2 style={{ paddingTop:'5%',fontSize:'30px', color: 'black', textAlign: 'center' }}>Profile</h2>
                <div className='commonProfileHeader'>
                    <div style={{ backgroundColor: "white", height: 400, width: 1400, borderRadius: 30 }}>
                        <div style={{ marginTop: "-5%" }}>
                            <Avatar sx={{ width: 220, height: 220, marginLeft: 10 }}>
                                <img id='myimg2' src={defaultProfilePicture} width={350} alt='profile-avatar' />
                            </Avatar>
                        </div>

                        <Avatar onClick={handleOpen} sx={{ width: 56, height: 56, float: "right", marginRight: "2%", marginTop: "-13%", cursor: "pointer" }}>
                            <EditIcon fontSize='large' />
                        </Avatar>
                        <div style={{ marginLeft: "30%", marginTop: "-10%", fontSize: 25 }}>
                            <p>Name: <b>{firstName} {lastName}</b></p>
                            <p>Email: {email}</p>
                            <p>Preferred Technologies: </p>
                            <img src={frontendTech[selectedFrontendTech][0]} alt={frontendTech[selectedFrontendTech][2]} width= {100}/>
                            <img src={frontendMobileTech[selectedMobileFrontendTech][0]} alt={frontendMobileTech[selectedMobileFrontendTech][2]} width= {100}/>
                            <img src={backendTech[selectedBackendTech][0]} alt={backendTech[selectedBackendTech][2]} width= {100}/>
                            <img src={databaseTech[selectedDatabaseTech][0]} alt={databaseTech[selectedDatabaseTech][2]} width= {100}/>

                        </div>

                    </div>
                </div>
            </div>

            <div >
                <Modal open={open} >
                    <Box sx={style}>
                        <h3 style={{ textAlign: "center", marginTop: "5%" }}> Edit Profile </h3>
                        <Button onClick={handleClose} style={{ float: 'right', marginTop: "-10%" }}> <CloseIcon style={{ color: 'black' }} /> </Button>

                        <form>
                            <TextField id="outlined-basic" label="First Name" variant="outlined" style={{ width: "100%" }} value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <br />
                            <br />
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" style={{ width: "100%" }} value={lastName} onChange={e => setLastName(e.target.value)} />
                            <br />
                            <br />
                            <Button style={{ float: 'right' }} variant='contained' onClick={() => {
                                updateUserDetails();
                                handleClose()
                            }}> Save Changes </Button>
                            <Button style={{ float: 'left' }} variant='contained' onClick={() => {
                                navigate('/techInput')
                            }}> Edit Preferred Technologies </Button>
                        </form>

                    </Box>
                </Modal>
            </div>
        </div>
    )
}