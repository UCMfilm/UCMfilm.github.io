// Import the functions you need from the SDKs you need
import { initializeApp ***REMOVED*** from "firebase/app";
import { getAnalytics ***REMOVED*** from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVdZgou7mGBXmfJ2N8QQ1lyNNGU4eKWLA",
  authDomain: "ucmfilm-c6bfe.firebaseapp.com",
  projectId: "ucmfilm-c6bfe",
  storageBucket: "ucmfilm-c6bfe.appspot.com",
  messagingSenderId: "71365436814",
  appId: "1:71365436814:web:683d1ace7f1e12e8e0f0df",
  measurementId: "G-Y09FC4BWGD"
***REMOVED***;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);