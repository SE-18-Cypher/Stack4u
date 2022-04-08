import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import FeedbackIcon from '@mui/icons-material/Feedback';

import app from './../../Firebase-config';
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { TextField } from '@mui/material';
import './Feedback.css';
import { useNavigate } from 'react-router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 2,
};

export default function Feedback() {
    //getting the user id value from the session storage 
    const user = sessionStorage.getItem("user");
    // navigate hook
    const navigate = useNavigate();
    // if the user id is null redirects to the access error page
    React.useEffect(() => {
        if (user === null) {
            navigate('/access_error')
        }
    },)
    //boolean hooks to hold feedback component visiability 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true); //feedback box is visible
    const handleClose = () => setOpen(false);   //feedback box is not visible 

    const [value, setValue] = React.useState(0); //hook to hold the star rating in the feedback box 
    const database = getFirestore(app); //database 
    const ref = collection(database, "Feedback"); //getting a reference to the databse "feedback" in firebase 

    //hooks to hold the name, email and the feedback from the user  
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userFeedback, setUserFeedback] = React.useState('');

    //function to check if the submision is valid
    function checkQuery() {
        if(userName === ""){
            //alert messages if the field is empty 
            alert("Name Field is empty");
        }
        else if (userEmail === ""){
            //alert message
            alert("Email Field is empty");
        }
        else if (userFeedback === ""){
            //alert message 
            alert("Feedback Field is empty");
        }
        else{
            submitQuery(); //submiting the query 
            setUserName(''); //resetting the text field values 
            setUserEmail('');
            setUserFeedback('');
            handleClose(); //closing the feedback box 
        }
    }

    //adding the feedback to firebase database 
    const submitQuery = async () => {
        await addDoc(ref, {
            //data from the respective hooks 
            userName: userName,
            userEmail: userEmail,
            userFeedback: userFeedback,
            userStars: value
        });
    };

    return (
        <div>
            <div className='feedbackButton'>
                <Button variant='contained' onClick={handleOpen}>Feedback<FeedbackIcon style={{marginLeft:11}}/> </Button>
            </div>
            <div >
                {/* pop up window to diplsy the feedback components */}
                <Modal
                    open={open}
                >
                    <Box sx={style}>
                        <h3 className='feedbackTopic'> Feedback </h3>
                        <Button onClick={handleClose} style={{ float: 'right', marginTop: -40 }}> <CloseIcon style={{ color: 'black' }} /> </Button>
                        <form>
                            <TextField id="outlined-basic" label="Name" variant="outlined"  style={{ width: 630 }} value={userName} onChange={e => setUserName(e.target.value)} />
                            <br />
                            <br />
                            <TextField id="outlined-basic" label="Email" variant="outlined" style={{ width: 630 }} value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
                            <br />
                            <br />
                            <TextField
                                id="standard-multiline-static"
                                label="Feedback"
                                position="absolute"
                                multiline
                                rows={10}
                                style={{ width: 630 }}
                                value={userFeedback} 
                                onChange={e => setUserFeedback(e.target.value)}
                            />
                            <br />
                            <br />
                            <div style={{ marginLeft: 246}}>
                                {/* star rating  */}
                                <Rating
                                    name="size-large"
                                    size='large'
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </div>
                            <br />
                            <br />
                            <Button style={{ float: 'right' }} variant='contained' onClick={() => { checkQuery() }}> Submit </Button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}
