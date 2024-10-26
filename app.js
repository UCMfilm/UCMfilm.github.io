// Firebase initialization (ensure Firebase SDK script is included in the HTML)
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
const db = firebase.firestore(); // Ensure this is defined at the start

// Google Sign-In setup
document.getElementById("googleLoginButton").addEventListener("click", function() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope("https://www.googleapis.com/auth/drive.file");

    firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            const googleAccessToken = result.credential.accessToken;
            displayProfile(user, "Google");
            console.log("Google access token:", googleAccessToken);
***REMOVED***)
        .catch((error) => {
            console.error("Error during Google login:", error);
***REMOVED***);
***REMOVED***);

// Microsoft Sign-In setup
document.getElementById("microsoftLoginButton").addEventListener("click", function() {
    const msalConfig = {
        auth: {
            clientId: '623e2399-7ec0-44fb-87b7-776e7c84e442',  // Replace with your Microsoft Client ID
            authority: 'https://login.microsoftonline.com/edcb846b-282a-41d3-9672-a2de8956a0f1',  // Replace with your Tenant ID
            redirectUri: 'https://ucmfilm.github.io/'  // GitHub Pages URL
***REMOVED***
    ***REMOVED***;

    const msalInstance = new msal.PublicClientApplication(msalConfig);

    msalInstance.loginPopup({
        scopes: ["Files.ReadWrite", "User.Read"]
    ***REMOVED***).then((response) => {
        console.log("Microsoft user:", response.account);
        const microsoftAccessToken = response.accessToken;
        displayProfile(response.account, "Microsoft");
        console.log("Microsoft access token:", microsoftAccessToken);
    ***REMOVED***).catch((error) => {
        console.error("Error during Microsoft login:", error);
***REMOVED***
***REMOVED***);

// Function to display user profile info after login
function displayProfile(user, provider) {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("userName").textContent = user.name || user.displayName;
    document.getElementById("provider").textContent = provider;
***REMOVED***

// Function to fetch and display project data from Firestore
***REMOVED***
    const projectRef = db.collection("projects").where("name", "==", projectName);

    projectRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const projectData = doc.data();
            document.getElementById("projectName").textContent = projectData.name;
            document.getElementById("projectDescription").textContent = projectData.description;
            document.getElementById("projectStatus").textContent = `Status: ${projectData.status***REMOVED***`;
***REMOVED***
***REMOVED*** // Hide list when displaying details
***REMOVED***);
    ***REMOVED***).catch((error) => {
        console.log("Error getting project data:", error);
***REMOVED***
***REMOVED***

// Function to return to project list view
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
