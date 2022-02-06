import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../../Firebase-config';
import { useNavigate } from "react-router";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {    
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};