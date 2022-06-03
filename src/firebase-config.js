// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmZ4hN7zAqJYpuLK4hjJ_IfaXE2ofCWWY",
  authDomain: "cryptoproject-fdf84.firebaseapp.com",
  projectId: "cryptoproject-fdf84",
  storageBucket: "cryptoproject-fdf84.appspot.com",
  messagingSenderId: "858347980166",
  appId: "1:858347980166:web:40427e8c6e9057785c9807",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
