// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAYGiV4MMZNhxj8qmR06q_4rge3--KdZE",
  authDomain: "email-password-auth-8e06d.firebaseapp.com",
  projectId: "email-password-auth-8e06d",
  storageBucket: "email-password-auth-8e06d.firebasestorage.app",
  messagingSenderId: "721413968461",
  appId: "1:721413968461:web:4297a741dc344559140204"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
