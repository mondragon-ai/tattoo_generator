import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// import serviceAccount from "../impowered-funnel-d95202c2d478.json";

// admin.initializeApp({
//   credential: (admin as any).cert(serviceAccount)
// });

// // const db = getFirestore();

// const firestoreDB: FirebaseFirestore.Firestore = admin.firestore();

// firestoreDB.settings({
//     timestampInSnapshot: true
// })

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  
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
// export const db = firestoreDB;
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore()