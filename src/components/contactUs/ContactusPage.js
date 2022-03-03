import React from 'react'
import NavBar from '../navBar/NavBar';
import './ContactUsPage.css'
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';

export default function ContactusPage() {
  return (
    <div>
      <NavBar />

      <div className='contactUsBackground'>

        <div className='contactUsHeader'>
          <h2 style={{ fontWeight: 'bold', fontFamily: 'calibri', color: 'black' }}>Contact Us</h2>
        </div>

        <Grid>

          <Card style={{ maxWidth: 950, padding: "0px 5px", margin: "0 auto"}}>
            <CardContent>
              
              <form>
                <Typography variant="h5">
                  Any question or remarks? Just write us a message!
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h6" gutterBottom>
                  Fill up the form and our team will get back to you.
                </Typography>

                <Grid container spacing={2}>

                  <Grid xs={12} sm={6} item>
                    <TextField placeholder="Enter your first name" label="First Name" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <TextField placeholder="Enter your last name" label="Last Name" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField type="email" placeholder="Enter your email address" label="Email" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField placeholder="Enter the subject" label="Subject" variant="outlined" fullWidth required />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required />
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
