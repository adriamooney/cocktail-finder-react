// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcJqYqoPgGDdzanYYfxOuRqDM24bLk4PM",
  authDomain: "cocktail-finder-react.firebaseapp.com",
  projectId: "cocktail-finder-react",
  storageBucket: "cocktail-finder-react.firebasestorage.app",
  messagingSenderId: "373815150701",
  appId: "1:373815150701:web:bfe10f0730500b5106d764"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore();