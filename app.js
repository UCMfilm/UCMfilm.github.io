// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
***REMOVED***;

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Confirm Firebase and Firestore Initialization
console.log("Firebase initialized:", firebase.apps.length > 0);
console.log("Firestore object:", db);

// Function to read data from Firestore
function readData() {
    db.collection("projects").get()
        .then((snapshot) => {
            let output = "Projects:<br>";
            snapshot.forEach((doc) => {
                const data = doc.data();
                output += `Name: ${data.name***REMOVED***, Status: ${data.status***REMOVED***, Description: ${data.description***REMOVED***<br>`;
    ***REMOVED***);
            document.getElementById("output").innerHTML = output;
***REMOVED***)
        .catch((error) => {
            console.error("Error fetching data:", error);
***REMOVED***
***REMOVED***);
***REMOVED***

// Call readData on load to test Firestore connection
window.onload = readData;
