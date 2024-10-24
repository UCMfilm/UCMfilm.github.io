// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Store file metadata in Firebase
function storeFileMetadata(fileName, fileId) {
  db.collection('files').add({
      name: fileName,
      fileId: fileId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  ***REMOVED***).then((docRef) => {
      console.log("Metadata stored with ID:", docRef.id);
  ***REMOVED***).catch((error) => {
      console.error("Error adding document:", error);
  ***REMOVED***);
***REMOVED***
