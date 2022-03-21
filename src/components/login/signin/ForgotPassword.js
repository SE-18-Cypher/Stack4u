import React from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ForgotPassword.css';
import { Modal } from '@mui/material';
import loudspeaker from '../../../resources/images/loudspeaker.png';
import success from '../../../resources/images/success.png';
import error from '../../../resources/images/error.png';

export default function ForgotPassword() {
  const navigate = useNavigate();
  document.title = "stack4u/Forgot Password";

  const [email, setEmail] = React.useState('');
  const auth = getAuth();
  function submit() {
    if (email !== '') {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          setView(true)
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            setViewErrorText('There is no Existing user in the Email entered')
          }
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

  const [view, setView] = React.useState(false);
  const [viewError, setViewError] = React.useState(false);
  const [viewErrorText, setViewErrorText] = React.useState('');
  const [backToLogin, setBackToLogin] = React.useState(true);

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
    borderRadius:'50px'
  };
  return (
    <div className="body">
      <div className='forgotPasswordEmailContainer'>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              width: 450,
              height: 580,
              m: 1,
            },
          }}
        >
          <Paper elevation={2}>
            <h3> Forgot your Password</h3>
            <input type='text' value={email} onChange={event => setEmail(event.target.value)} />
            <button type='submit' onClick={() => submit()}>dd </button>
          </Paper>
        </Box>

        <Modal
          open={view}
          onClose={() => setBackToLogin(false)}
        >
          <Box sx={style}>
            sucess
          </Box>
        </Modal>

        <Modal
          open={viewError}
          onClose={() => setViewError(false)}
        >
          <Box sx={style}>
            <h3 style={{textAlign:'center',marginTop:'10%'}}>ERROR</h3>
            <img src={error} width={100} className='decoImage' />
            <br/>
            <h5 style={{marginTop:'20%',textAlign:'center'}}> {viewErrorText} </h5>
            <div className='curvedCornerLoudSpeaker' />
            <div className='decoImageLoduspeakerContainer'>
              <img src={loudspeaker} width={300} className='decoImageLoudspeaker' />
            </div>

          </Box>
        </Modal>

      </div>
    </div >
  );
}
