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

const theme = createTheme();

export default function Signin() {
  document.title = "stack4u/SignIn";
  const navigate = useNavigate();
  const checkAuth = (data) => {
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                required={validEmail}
                error={!validEmail}
                helperText={emailHelperText}
              />
              <TextField
                margin="normal"
                required={validPassword}
                error={!validPassword}
                helperText={passwordHelperText}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"    
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="" variant="body2" onClick={() => navigate("./ForgotPassword")}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}






