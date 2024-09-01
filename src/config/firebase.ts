// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFQLxQ8hDJuPHXoQNLxb0VzfLuXMWOOoI",
  authDomain: "react-app-589ec.firebaseapp.com",
  projectId: "react-app-589ec",
  storageBucket: "react-app-589ec.appspot.com",
  messagingSenderId: "473591526205",
  appId: "1:473591526205:web:d1acb06b8d33b99fdc8b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)