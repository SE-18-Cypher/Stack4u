import { Grid, Paper, Button } from "@mui/material"

export const Profile = () =>{

    const paperstyle = {padding:20, height: '70vh', width:400, margin: "100px auto"}

    return(
        <Grid>
            <Paper elevation={10} style={paperstyle}>
                <h2>Profile</h2>
                <Button type = "submit" color ="primary" variant="contained" fullWidth>Edit Profile</Button>
            </Paper>
        </Grid>
    );
}