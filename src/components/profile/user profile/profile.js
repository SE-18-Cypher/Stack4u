import { Button, Grid, Typography } from '@mui/material';
import './profile.css';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { Firestore, getFirestore} from "firebase/firestore";
import app from '../../../Firebase-config'

export const Profile = () =>{

    const firestore = getFirestore(app);

    const createUserDocument = async (user, additionalData) => {
        if (!user)
            return;

        const userRef = firestore.doc(`users/${user.uid}`);

        const snapshot = await userRef.get();

        if (!snapshot.exists) {
            const { email } = user;
            const { displayName } = additionalData;

            try {
                userRef.set({
                    displayName,
                    email,
                    createdAt: new Date(),
                })
            } catch (error) {
                console.log('Error in creating user', error);
            }
        }
    }
    const [users, setUsers] = useState([]);

    useEffect(
        () => 
            onSnapshot(collection(firestore, 'users')), (snapshot) => setUsers(snapshot.docs.map((doc) => (doc.data()))
            ),
        []
    );

    return(
        <div>
            <Grid>
                <Typography variant="h4">First Name</Typography>
                <Typography variant="h4">Last Name</Typography>
                <Typography variant="h4">Email Address</Typography>
                {/* <Button type="submit" color="primary" variant="contained">Edit Profile</Button> */}
            </Grid>    
        </div>
        
    );
}