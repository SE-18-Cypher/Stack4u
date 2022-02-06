import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvPnnU7yq28bOQbkrpR2T2YP8zlpm6AaI",
  authDomain: "sign-in-4c024.firebaseapp.com",
  projectId: "sign-in-4c024",
  storageBucket: "sign-in-4c024.appspot.com",
  messagingSenderId: "673328316656",
  appId: "1:673328316656:web:ff6fd928ecdfd9c61e4235"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};