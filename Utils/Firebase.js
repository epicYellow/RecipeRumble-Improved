// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkufSIwt0JpKIoCD-lFdhPQY800OzTPXY",
  authDomain: "reciperumble-f3601.firebaseapp.com",
  projectId: "reciperumble-f3601",
  storageBucket: "reciperumble-f3601.appspot.com",
  messagingSenderId: "820427965916",
  appId: "1:820427965916:web:4dd896edce77c09ad83b19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
