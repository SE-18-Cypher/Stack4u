import React from 'react'
import NavBar from '../navBar/NavBar';
import './ContactUsPage.css'
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default function ContactusPage() {
  const user = localStorage.getItem("user");
  //emailjs reference variables
  const SERVICE_ID = "service_10mf3il";
  const TEMPLATE_ID = "template_2u15ydb";
  const USER_ID = "9TYdl_FYY55wxYM69";

  //Handle the submission of the form
  const handleOnSubmit = (e) =>{
      e.preventDefault();
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          confirmButtonColor: "#2389eb",
          icon: 'success',
          title: 'Message Sent Successfully' //success message
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          confirmButtonColor: "#2389eb",
          icon: 'error',
          title: 'Ooops, something went wrong', //error message
          text: error.text,
        })
      });
      e.target.reset()
  }

  return (
    <div>
      <NavBar uidValue={user}/>

      <div className='contactUsBackground'>

        <div className='contactUsHeader'>
          <h2 style={{ fontWeight: 'bold', fontFamily: 'calibri', color: 'black' }}>Contact Us</h2>
        </div>

        <Grid>

          <Card style={{ maxWidth: 950, maxHeight: 580, padding: "0px 5px", margin: "0 auto"}}>
            <CardContent>
              
              {/* Form that needs to be filled by the user */}
              <form onSubmit={handleOnSubmit}>
                <Typography variant="h5">
                  Any question or remarks? Just write us a message!
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h6" gutterBottom>
                  Fill up the form and our team will get back to you.
                </Typography>

                <Grid container spacing={2}>

                  <Grid xs={12} sm={6} item>
                    <TextField name="fName" placeholder="Enter your first name" label="First Name" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <TextField name="lName"placeholder="Enter your last name" label="Last Name" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="userEmail" type="email" placeholder="Enter your email address" label="Email" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="subject" placeholder="Enter the subject" label="Subject" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="message" label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>

                </Grid>
              </form>

            </CardContent>
          </Card>

        </Grid>
      </div>
    </div>
  )
}
