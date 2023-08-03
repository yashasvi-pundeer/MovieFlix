// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpkHn6ketsnKdpyRGAOXU5ThzEG4Is5Tc",
  authDomain: "netflix-clone-mern-492a6.firebaseapp.com",
  projectId: "netflix-clone-mern-492a6",
  storageBucket: "netflix-clone-mern-492a6.appspot.com",
  messagingSenderId: "932736370565",
  appId: "1:932736370565:web:8e4b8dcf486ca5942e66ec",
  measurementId: "G-MMWNWW42HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);