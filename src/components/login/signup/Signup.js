import "./Signup.css";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../../Firebase-config';
import { Modal } from "@mui/material";
import error from '../../../resources/images/error.png';
import cape from '../../../resources/images/astronautCape.png';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const theme = createTheme();

export default function Signup() {
    //navigate hook
    const navigate = useNavigate();
    // document title
    document.title = "stack4u/SignUp";

    const provider = new GoogleAuthProvider();
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const checkAuth = (data) => {
        if (data.get('password').length < 7) {
            setValidPassword(false);
            setPasswordHelperText("Password is weak");
            setPasswordLabelName("");
        }
        if (data.get('firstName') === "") {
            setValidFName(false);
            setFNameHelpertext("Field is empty");
            setFirstNameLabelName("");
        }
        if (data.get('firstName') !== "") {
            setValidFName(true);
            setFNameHelpertext("");
            setFirstNameLabelName("First Name");
        }
        if (data.get('lastName') === "") {
            setValidLName(false);
            setLNameHelpertext("Field is empty");
            setLastNameLabelName("");
        }
        if (data.get('lastName') !== "") {
            setValidLName(true);
            setLNameHelpertext("");
            setLastNameLabelName("Last Name");
        }
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
        signUpWithEmail();
    };

    const signUpWithEmail = async () =>{
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user;
                addUser(user);
                sessionStorage.setItem("user", res.user.uid);
                navigate("/techinput");
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    setErrorText("Invalid Email")
                }
                if (error.code === 'auth/user-not-found') {
                    setErrorText("User Not Found Email")
                }
                if (error.code === 'auth/wrong-password') {
                    setErrorText("Incorrect Password")
                }
                setErrorBox(true);
            });

    }

    function signInWithGoogle() {
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {

                localStorage.setItem("user", result.user.uid);
                localStorage.setItem("guser", result.user.photoURL);
                let text = result.user.displayName;
                const nameArray = text.split(" ");
                const user = result.user;
                addGoogleUser(user,nameArray[0],nameArray[1]);
                sessionStorage.setItem("user", result.user.uid);
                sessionStorage.setItem("guser", result.user.photoURL);

                navigate("/techinput");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const database = getFirestore(app);
    const addUser = async (user) => {
        const ref = doc(database, 'Users', user.uid);
        await setDoc(ref, {
            userID    : user.uid,
            firstName : firstName,
            lastName  : lastName,
            email     : user.email
        });
    };

    const addGoogleUser = async (user,fname,lname) => {
        const ref = doc(database, 'Users', user.uid);
        await setDoc(ref, {
            userID    : user.uid,
            firstName : fname,
            lastName  : lname,
            email     : user.email
        });
    };

    const [validFName, setValidFName] = React.useState(true);
    const [fNameHelpertext, setFNameHelpertext] = React.useState("");

    const [validLName, setValidLName] = React.useState(true);
    const [lNameHelpertext, setLNameHelpertext] = React.useState("");

    const [validEmail, setValidEmail] = React.useState(true);
    const [emailHelperText, setEmailHelperText] = React.useState("");

    const [validPassword, setValidPassword] = React.useState(true);
    const [passwordHelperText, setPasswordHelperText] = React.useState("");

    const [firstNameLabelName, setFirstNameLabelName] = React.useState("FirstName");
    const [lastNameLabelName, setLastNameLabelName] = React.useState("LastName");
    const [emailLabelName, setEmailLabelName] = React.useState("EmailAddress");
    const [passwordLabelName, setPasswordLabelName] = React.useState("Password");

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
                    <h3 style={{ textAlign: 'center', marginTop: '10%', fontSize: 30, fontWeight: 'bold' }}>ERROR</h3>
                    <img src={error} width={80} className='decoImage' alt="deco pic" />
                    <br />
                    <h5 style={{ marginTop: '20%', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}> {errorText}  </h5>
                    <div>
                        <img src={cape} width={300} className='decoImageLoudspeaker' style={{ marginTop: -50, marginLeft: 35 }} alt='deco pic' />
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
                        <Typography component="h1" variant="h5"  >
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required={validFName}
                                        error={!validFName}
                                        placeholder={fNameHelpertext}
                                        fullWidth
                                        id="firstName"
                                        label={firstNameLabelName}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={validLName}
                                        error={!validLName}
                                        placeholder={lNameHelpertext}
                                        fullWidth
                                        id="lastName"
                                        label={lastNameLabelName}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required={validEmail}
                                        error={!validEmail}
                                        placeholder={emailHelperText}
                                        fullWidth
                                        id="email"
                                        label={emailLabelName}
                                        name="email"
                                        autoComplete="email"
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required={validPassword}
                                        error={!validPassword}
                                        placeholder={passwordHelperText}
                                        fullWidth
                                        name="password"
                                        label={passwordLabelName}
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={signUpWithEmail}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid>
                                    <button className="login-with-google-btn" onClick={() => signInWithGoogle()}>
                                        Sign up with Google
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