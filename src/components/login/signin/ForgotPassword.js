import React from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ForgotPassword.css';
import { Modal, TextField } from '@mui/material';
import loudspeaker from '../../../resources/images/loudspeaker.png';
import success from '../../../resources/images/success.png';
import error from '../../../resources/images/error.png';
import forgotpassword from '../../../resources/images/forgotpassword.png';

export default function ForgotPassword() {
  // navigate hook
  const navigate = useNavigate();
  // setting the document title
  document.title = "stack4u/Forgot Password";

  const [email, setEmail] = React.useState(''); //email value
  const auth = getAuth(); 
  function submit() {
    if (email !== '') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          setView(true)
        })
        .catch((error) => {
          //if the user is not found 
          if (error.code === 'auth/user-not-found') {
            setViewErrorText('There is no Existing user in the Email entered')
          }
          // if the entered email is in invalid 
          if (error.code === 'auth/invalid-email') {
            setViewErrorText('The Entered Email is invalid')
          }
          console.log(error.code)
          setViewError(true)
        });
    }
    else {
      alert('Email Field is empty')
    }
  }
  // hook to make the suceess box visible
  const [view, setView] = React.useState(false);
  // hook to make the error box visible
  const [viewError, setViewError] = React.useState(false);
  const [viewErrorText, setViewErrorText] = React.useState('');
  const [backToLogin, setBackToLogin] = React.useState(true);

  // use effect to navigate to login page once the hook is set true
  React.useEffect(() => {
    if (!backToLogin) {
      navigate('/login')
    }
  }, [backToLogin])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    border: '0',
    boxShadow: 10,
    borderRadius: '50px'
  };
  return (
    <div className="body">
      <div className='forgotPasswordEmailContainer'>
        <Box
          sx={{
            display: 'flex',
            borderRadius: 50,
            flexWrap: 'wrap',
            '& > :not(style)': {
              width: 450,
              height: 480,
              m: 1,
            },
          }}
        >
          <Paper elevation={2}>
            <h3 style={{ textAlign: 'center', marginTop: '10%' }}> FORGOT PASSWORD?</h3>
            <TextField className='inputContainer'
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button type='submit' variant='contained' onClick={() => submit()} style={{ marginTop: '25%', marginLeft:'70%' }}> Submit </Button>
            <img src={forgotpassword} width={300} style={{ marginTop: '-20%' }} alt='deco pic'/>
          </Paper>
        </Box>
        {/* sucess box  */}
        <Modal
          open={view}
          onClose={() => setBackToLogin(false)}
        >
          <Box sx={style}>
            <h3 style={{ textAlign: 'center', marginTop: '10%' }}>SUCCESS</h3>
            <img src={success} width={100} className='decoImage' alt='deco pic'/>
            <br />
            <h5 style={{ marginTop: '20%', textAlign: 'center' }}> Verification Email has been successfully sent </h5>
            <div className='curvedCornerLoudSpeaker' />
            <div className='decoImageLoduspeakerContainer'>
              <img src={loudspeaker} width={300} className='decoImageLoudspeaker' alt='deco pic' />
            </div>

          </Box>
        </Modal>
        {/* error box  */}
        <Modal
          open={viewError}
          onClose={() => setViewError(false)}
        >
          <Box sx={style}>
            <h3 style={{ textAlign: 'center', marginTop: '10%' }}>ERROR</h3>
            <img src={error} width={100} className='decoImage' alt='deco pic' />
            <br />
            <h5 style={{ marginTop: '20%', textAlign: 'center' }}> {viewErrorText} </h5>
            <div className='curvedCornerLoudSpeaker' />
            <div className='decoImageLoduspeakerContainer'>
              <img src={loudspeaker} width={300} className='decoImageLoudspeaker' alt='deco pic'/>
            </div>

          </Box>
        </Modal>

      </div>
    </div >
  );
}
