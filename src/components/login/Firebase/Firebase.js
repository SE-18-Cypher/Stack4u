import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../../Firebase-config';
import { useNavigate } from "react-router";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const navigate = useNavigate();
      navigate('./home')
    })
    .catch((error) => {
      console.log(error);
    });
};