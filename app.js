const CLIENT_ID = '71365436814-tj6nv6feqpa75h6rgckee3lkc1kce458.apps.googleusercontent.com';

let tokenClient;
let accessToken = null;
let authorizeButton = document.getElementById('authorize_button');
let signoutButton = document.getElementById('signout_button');
let fileInput = document.getElementById('file_input');
let uploadButton = document.getElementById('upload_button');

// Initialize the Google Identity Services client
function initializeGSI() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.file',
        callback: (tokenResponse) => {
            if (tokenResponse.access_token) {
                accessToken = tokenResponse.access_token;
                console.log('Access token received.');
                uploadButton.disabled = false;  // Enable upload button once authenticated
    ***REMOVED***
***REMOVED***,
***REMOVED***
***REMOVED***

// Trigger the authorization flow when the user clicks the Authorize button
function handleAuthClick() {
    tokenClient.requestAccessToken();
***REMOVED***

// Sign out function (invalidate token)
function handleSignoutClick() {
    accessToken = null;
    console.log('Signed out.');
***REMOVED***

// Upload the selected file to Google Drive
function handleUploadClick() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file");
        return;
    ***REMOVED***

    // Simplified metadata for debugging
    const metadata = {
        name: file.name  // Only provide the file name for now
    ***REMOVED***;

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' ***REMOVED***));
    form.append('file', file);

    // Ensure the access token is included in the request headers
    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + accessToken  // Include the access token
***REMOVED***),
        body: form
    ***REMOVED***).then((response) => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
***REMOVED***
        return response.json();
    ***REMOVED***).then((data) => {
        console.log('File uploaded successfully', data);
    ***REMOVED***).catch((error) => {
        console.error('Error uploading file:', error);
***REMOVED***
***REMOVED***

// Initialize the GSI client when the page loads
window.onload = initializeGSI;
authorizeButton.onclick = handleAuthClick;
signoutButton.onclick = handleSignoutClick;
uploadButton.onclick = handleUploadClick;
