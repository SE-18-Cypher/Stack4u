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

export default function CommonProfile() {
    const user = sessionStorage.getItem("user");
    const navigate = useNavigate();
    const storage = getStorage();

    React.useEffect(() => {
        if (user === null) {
            navigate('/access_error')
        }
    })

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
    const database = getFirestore(app);

    const docRef = doc(database, "Users", user);    

    const getUserDetails = async () => {
        
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserData(docSnap.data());
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    React.useEffect(() => {
        getUserDetails();
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const updateUserDetails = updateDoc(docRef, {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email
    // });

    const updateUserDetails = async () => {
        await updateDoc(docRef, {
            firstName: firstName,
            lastName: lastName,
            email: email
        });
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

    return (
        <div>
            <NavBar uidValue={user} />
            <div className="profilePage">
                <div className='commonProfileHeader'>
                    <div style={{ backgroundColor: "white", height: 280, width: 1400, borderRadius: 30 }}>
                        <div style={{ marginTop: "10%" }}>
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
                            <TextField id="outlined-basic" label="Email" style={{ width: "100%" }} value={email} onChange={e => setEmail(e.target.value)} />
                            <br />
                            <br />
                            <Button style={{ float: 'right' }} variant='contained' onClick={updateUserDetails}> Save Changes </Button>
                        </form>

                    </Box>
                </Modal>
            </div>
        </div>
    )
}