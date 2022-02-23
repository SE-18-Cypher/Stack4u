import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';

import app from './../../Firebase-config';
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Feedback() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState(2);
    const database = getFirestore(app);
    const ref = collection(database, "Feedback");

    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userFeedback, setUserFeedback] = React.useState('');

    function checkQuery() {
        if(userName == ""){
            alert("Name Field is empty");
        }
        else if (userEmail == ""){
            alert("Email Field is empty");
        }
        else if (userFeedback == ""){
            alert("Feedback Field is empty");
        }
        else{
            submitQuery();
            setUserName('');
            setUserEmail('');
            setUserFeedback('');
        }
    }
    const submitQuery = async () => {
        await addDoc(ref, {
            userName: userName,
            userEmail: userEmail,
            userFeedback: userFeedback,
            userStars: value
        });
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <div className='animate'>
                <Modal
                    open={open}
                >
                    <Box sx={style}>
                        <h3 style={{ textAlign: 'center' }}> Feedback </h3>
                        <Button onClick={handleClose} style={{ float: 'right', marginTop: -40 }}> <CloseIcon style={{ color: 'red' }} /> </Button>

                        <form>
                            <TextField id="outlined-basic" label="Name" variant="outlined" style={{ width: 300 }} value={userName} onChange={e => setUserName(e.target.value)} />
                            <br />
                            <br />
                            <TextField id="outlined-basic" label="Email" variant="outlined" style={{ width: 300 }} value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
                            <br />
                            <br />
                            <TextField
                                id="standard-multiline-static"
                                label="Feedback"
                                multiline
                                rows={10}
                                style={{ width: 300 }}
                                value={userFeedback} 
                                onChange={e => setUserFeedback(e.target.value)}
                            />
                            <br />
                            <br />
                            <div style={{ marginLeft: 60}}>
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
