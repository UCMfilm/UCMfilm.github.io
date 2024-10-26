// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVdZgou7mGBXmfJ2N8QQ1lyNNGU4eKWLA",
    authDomain: "ucmfilm-c6bfe.firebaseapp.com",
    projectId: "ucmfilm-c6bfe",
    storageBucket: "ucmfilm-c6bfe.appspot.com",
    messagingSenderId: "71365436814",
    appId: "1:71365436814:web:683d1ace7f1e12e8e0f0df"
***REMOVED***;

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Confirm Firebase and Firestore initialization
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
