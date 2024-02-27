// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxOvzw-mOPvrc68nEMUqS4k3iWjjZGCNE",
  authDomain: "anthill-1664f.firebaseapp.com",
  databaseURL: "https://anthill-1664f-default-rtdb.firebaseio.com",
  projectId: "anthill-1664f",
  storageBucket: "anthill-1664f.appspot.com",
  messagingSenderId: "737904242557",
  appId: "1:737904242557:web:238f0d74a518d9a115e614",
  measurementId: "G-E2FJ5E04EP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };