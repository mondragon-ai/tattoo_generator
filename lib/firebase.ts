// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBWF5J81CI5ALkTqJvw0zg2iSRSqzweJ2E",
    authDomain: "tattooideas-10372.firebaseapp.com",
    projectId: "tattooideas-10372",
    storageBucket: "tattooideas-10372.appspot.com",
    messagingSenderId: "434304173460",
    appId: "1:434304173460:web:2a4646dbec288079f4bb81",
    measurementId: "G-LLWR10THS6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore()

export const storage = getStorage(app);