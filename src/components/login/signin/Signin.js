import './Signin.css';
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router";

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Modal } from '@mui/material';

import loudspeaker from '../../../resources/images/loudspeaker.png';
import error from '../../../resources/images/error.png';
import cape from '../../../resources/images/astronautCape.png';

const theme = createTheme();

export default function Signin() {
  document.title = "stack4u/SignIn";
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const checkAuth = (data) => {
    if (data.get('email') === "") {
      setValidEmail(false);
      setEmailHelperText("Enter a valid email address");
      setEmailLabelName("");
    }
    if (data.get('password') === "") {
      setValidPassword(false);
      setPasswordHelperText("Enter a valid password");
      setPasswordLabelName("");
    }
    if (data.get('email') !== "") {
      setValidEmail(true);
      setEmailHelperText("");
      setEmailLabelName("Email Address");
    }
    if (data.get('password') !== "") {
      setValidPassword(true);
      setPasswordHelperText("");
      setPasswordLabelName("Password");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    checkAuth(data);
  };


  function signInWithEmail() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sessionStorage.setItem("user", userCredential.user.uid);
        sessionStorage.setItem("rememberMe", rememberMe);
        console.log(sessionStorage.getItem("guser"))
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/invalid-email'){
          setErrorText("Invalid Email")
        }
        if (error.code === 'auth/user-not-found'){
          setErrorText("User Not Found Email")
        }
        if (error.code === 'auth/invalid-email'){
          setErrorText("Incorrect Password")
        }
        setErrorBox(true);
      });
  }

  function signInWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        sessionStorage.setItem("user", result.user.uid);
        sessionStorage.setItem("guser", result.user.photoURL);
        let text = result.user.displayName;
        const myArray = text.split(" ");
        sessionStorage.setItem("guserFirstName", myArray[0]);
        sessionStorage.setItem("guserSecondName", myArray[1]);
        sessionStorage.setItem("rememberMe", rememberMe);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const [validEmail, setValidEmail] = React.useState(true);
  const [emailHelperText, setEmailHelperText] = React.useState("");

  const [validPassword, setValidPassword] = React.useState(true);
  const [passwordHelperText, setPasswordHelperText] = React.useState("");

  const [emailLabelName, setEmailLabelName] = React.useState("EmailAddress");
  const [passwordLabelName, setPasswordLabelName] = React.useState("Password");

  const [rememberMe, setRememberMe] = React.useState(false);
  const toggleRememberMe = () => setRememberMe((rememberMe) => !rememberMe);
  
  const [errorText, setErrorText] = React.useState("");

  const [errorBox, setErrorBox] = React.useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    borderRadius: '50px'
  };

  return (
    <div>
      <Modal
          open={errorBox}
          onClose={() => setErrorBox(false)}
        >
          <Box sx={style}>
            <h3 style={{ textAlign: 'center', marginTop: '10%', fontSize:30, fontWeight:'bold' }}>ERROR</h3>
            <img src={error} width={80} className='decoImage' />
            <br />
            <h5 style={{ marginTop: '20%', textAlign: 'center', fontSize:30, fontWeight:'bold' }}> {errorText}  </h5>
            <div>
              <img src={cape} width={300} className='decoImageLoudspeaker' style={{marginTop:-50,marginLeft:35}}/>
            </div>
          </Box>
        </Modal>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'rgb(17, 131, 214,1)' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                fullWidth
                id="email"
                label={emailLabelName}
                name="email"
                autoComplete="email"
                autoFocus
                required={validEmail}
                error={!validEmail}
                placeholder={emailHelperText}
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required={validPassword}
                error={!validPassword}
                placeholder={passwordHelperText}
                fullWidth
                name="password"
                label={passwordLabelName}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                onClick={() => toggleRememberMe()}
              />
              <Grid item xs>
                <Link href="" style={{ color: "rgb(1, 103, 176, 0.88)" }} variant="body2" onClick={() => navigate("/forgotpassword")}>
                  Forgot password?
                </Link>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signInWithEmail}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid>
                  <button className="login-with-google-btn" onClick={() => signInWithGoogle()}>
                    Sign in with Google
                  </button>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </div>
  )
}