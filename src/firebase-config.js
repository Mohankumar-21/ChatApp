// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
import{ getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3jYF8dLY3HABJPhN6iunLtXI9OePA8QM",
  authDomain: "chatapp-b451e.firebaseapp.com",
  projectId: "chatapp-b451e",
  storageBucket: "chatapp-b451e.appspot.com",
  messagingSenderId: "1074482495312",
  appId: "1:1074482495312:web:5625c097da4240fb2bb655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);