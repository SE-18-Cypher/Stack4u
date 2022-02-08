import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyCQYBjHambLVhX2FkihmNtg7dwXDG0Zu_4',
  authDomain: 'stack4u-dev.firebaseapp.com',
  projectId: 'stack4u-dev',
  storageBucket: 'stack4u-dev.appspot.com',
  messagingSenderId: '832380032977',
  appId: '1:832380032977:web:091e5642303520e5def2f0',
  measurementId: 'G-P8GW64VPSB'
};

const app = initializeApp(firebaseConfig);
export default app;

