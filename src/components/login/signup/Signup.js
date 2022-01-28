import "./Signup.css";
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
  
const theme = createTheme();

  export default function Signup() {
    document.title = "stack4u/SignUp";
    
    const checkAuth = (data) => {
        if (data.get('password').length < 7){
            setValidPassword(false);
            setPasswordHelperText("Password is weak");
        }
        if(data.get('firstName') === ""){
            setValidFName(false);
            setFNameHelpertext("Field is empty");
        }
        if(data.get('firstName') !== ""){
            setValidFName(true);
            setFNameHelpertext("");
        }
        if(data.get('lastName') === ""){
            setValidLName(false);
            setLNameHelpertext("Field is empty");
        }
        if(data.get('lastName') !== ""){
            setValidLName(true);
            setLNameHelpertext("");
        }
        if (data.get('email') === ""){
            setValidEmail(false);
            setEmailHelperText("Enter a valid email address");
        }
        if (data.get('password') === ""){
            setValidPassword(false);
            setPasswordHelperText("Enter a valid password");
        }
        if (data.get('email') !== ""){
            setValidEmail(true);
            setEmailHelperText("");
        }
        if (data.get('password') !== ""){
            setValidPassword(true);
            setPasswordHelperText("");
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        checkAuth(data);
    };

    const [validFName, setValidFName] = React.useState(true);
    const [fNameHelpertext, setFNameHelpertext] = React.useState("");

    const [validLName, setValidLName] = React.useState(true);
    const [lNameHelpertext, setLNameHelpertext] = React.useState("");

    const [validEmail, setValidEmail] = React.useState(true);
    const [emailHelperText, setEmailHelperText] = React.useState("");
  
    const [validPassword, setValidPassword] = React.useState(true);
    const [passwordHelperText, setPasswordHelperText] = React.useState("");
    return (
        <div>
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
                                helperText={fNameHelpertext}
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required={validLName}
                                error={!validLName}
                                helperText={lNameHelpertext}
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required={validEmail}
                                error={!validEmail}
                                helperText={emailHelperText}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required={validPassword}
                                error={!validPassword}
                                helperText={passwordHelperText}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                    </Box>
                </Box>
                </Container>
            </ThemeProvider>
        </div>    
    )
}