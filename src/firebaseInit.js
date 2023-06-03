import firebase from 'firebase/compat/app';
import 'firebase/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBovJowpn9iySLCRfmeYh-h1LU3_tAewH0",
  authDomain: "lasting-tales-bestiary.firebaseapp.com",
  projectId: "lasting-tales-bestiary",
  storageBucket: "lasting-tales-bestiary.appspot.com",
  messagingSenderId: "500157355682",
  appId: "1:500157355682:web:2bc1f978933bb62e8fe9fb",
  measurementId: "G-31J1EEZQ26"
};

export default firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();