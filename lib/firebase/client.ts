import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0O40wbBO08WlvdNrZ5KzufeD_Y9EbwfU",
  authDomain: "next-base-403406.firebaseapp.com",
  projectId: "next-base-403406",
  storageBucket: "next-base-403406.appspot.com",
  messagingSenderId: "953298012875",
  appId: "1:953298012875:web:3a264653ecc0aa2198a94e",
  measurementId: "G-724J35FKNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
