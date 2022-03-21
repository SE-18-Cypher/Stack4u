import React from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './ForgotPassword.css';
import { Modal } from '@mui/material';

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
    width: 700,
    height: 300,
    bgcolor: 'background.paper',
    border: '0',
    boxShadow: 10,
    p: 4,
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
            {viewErrorText}
          </Box>
        </Modal>

      </div>
    </div >
  );
}
