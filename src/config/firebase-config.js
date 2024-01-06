// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYcHZedYVXM4nP6VE6UsNLAjQtctvIlP0",
  authDomain: "expense-tracker-cea92.firebaseapp.com",
  projectId: "expense-tracker-cea92",
  storageBucket: "expense-tracker-cea92.appspot.com",
  messagingSenderId: "742637384007",
  appId: "1:742637384007:web:ff0ff170b568d14002dc62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);