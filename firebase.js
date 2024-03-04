// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9fSoxzgx8qTCpb3bFrNxFBlfzYJ9SPeo",
  authDomain: "kitchenwise-20ce1.firebaseapp.com",
  projectId: "kitchenwise-20ce1",
  storageBucket: "kitchenwise-20ce1.appspot.com",
  messagingSenderId: "966980480629",
  appId: "1:966980480629:web:d63e449c5670c5b2bf923c",
  measurementId: "G-5QLF22KPKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);