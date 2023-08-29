import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyC3xPBosqkBuW75iKUXRkPFwWMyQHjweNY",
    authDomain: "scary-text-f5684.firebaseapp.com",
    projectId: "scary-text-f5684",
    storageBucket: "scary-text-f5684.appspot.com",
    messagingSenderId: "769113873208",
    appId: "1:769113873208:web:803dc4425d75bd2f447fcd",
    measurementId: "G-M308YP5W81"
  };


const app = initializeApp(firebaseConfig);   // Initialize Firebase
const db = getFirestore(app);   // Initialize Cloud Firestore and get a reference to the service

  
export {app, db}