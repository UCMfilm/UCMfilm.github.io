// ------------------------ Google Drive Setup ------------------------

const googleClientId = '71365436814-tj6nv6feqpa75h6rgckee3lkc1kce458.apps.googleusercontent.com';
let googleTokenClient;
let googleAccessToken = null;
let googleAuthorizeButton = document.getElementById('google_authorize_button');
let googleSignoutButton = document.getElementById('google_signout_button');
let googleFileInput = document.getElementById('google_file_input');
let googleUploadButton = document.getElementById('google_upload_button');

// Initialize Google Identity Services (GIS)
function initializeGoogleGSI() {
    googleTokenClient = google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: 'https://www.googleapis.com/auth/drive.file',
        callback: (tokenResponse) => {
            if (tokenResponse.access_token) {
                googleAccessToken = tokenResponse.access_token;
                console.log('Google Drive access token received.');
                googleUploadButton.disabled = false;  // Enable Google Drive upload button
    ***REMOVED***
***REMOVED***,
***REMOVED***
***REMOVED***

// Trigger Google authorization flow
function handleGoogleAuthClick() {
    googleTokenClient.requestAccessToken();
***REMOVED***

// Google Drive file upload
function handleGoogleUploadClick() {
    const file = googleFileInput.files[0];
    if (!file) {
        alert("Please select a file for Google Drive.");
        return;
    ***REMOVED***

    const metadata = { name: file.name ***REMOVED***;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' ***REMOVED***));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + googleAccessToken ***REMOVED***),
        body: form
    ***REMOVED***).then((response) => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
***REMOVED***
        return response.json();
    ***REMOVED***).then((data) => {
        console.log('File uploaded to Google Drive successfully', data);
    ***REMOVED***).catch((error) => {
        console.error('Error uploading to Google Drive:', error);
***REMOVED***
***REMOVED***

// ------------------------ Microsoft OneDrive Setup ------------------------

const msalConfig = {
    auth: {
        clientId: 'YOUR_MICROSOFT_CLIENT_ID',  // Replace with your Microsoft Client ID
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',  // Replace with your Tenant ID
        redirectUri: 'https://ucmfilm.github.io/'  // Your redirect URI (GitHub Pages URL)
    ***REMOVED***
***REMOVED***;

const msalInstance = new msal.PublicClientApplication(msalConfig);
let microsoftAccessToken = null;
let microsoftLoginButton = document.getElementById('microsoft_login_button');
let microsoftFileInput = document.getElementById('microsoft_file_input');
let microsoftUploadButton = document.getElementById('microsoft_upload_button');

// Authentication scopes for OneDrive
const microsoftLoginRequest = {
    scopes: ['Files.ReadWrite', 'Files.ReadWrite.All']
***REMOVED***;

// Microsoft login
function handleMicrosoftLogin() {
    msalInstance.loginPopup(microsoftLoginRequest)
        .then(response => {
            console.log("Microsoft login successful");
            microsoftAccessToken = response.accessToken;
            microsoftUploadButton.disabled = false;  // Enable OneDrive upload button
***REMOVED***)
        .catch(error => {
            console.error("Error during Microsoft login", error);
***REMOVED***);
***REMOVED***

// Upload file to OneDrive
function handleMicrosoftUploadClick() {
    const file = microsoftFileInput.files[0];
    if (!file) {
        alert("Please select a file for OneDrive.");
        return;
    ***REMOVED***

    const uploadUrl = 'https://graph.microsoft.com/v1.0/me/drive/root:/' + file.name + ':/content';

    fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + microsoftAccessToken,
            'Content-Type': file.type
***REMOVED***,
        body: file
    ***REMOVED***).then((response) => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
***REMOVED***
        return response.json();
    ***REMOVED***).then((data) => {
        console.log('File uploaded to OneDrive successfully:', data);
    ***REMOVED***).catch((error) => {
        console.error('Error uploading to OneDrive:', error);
***REMOVED***
***REMOVED***

// ------------------------ Event Listeners ------------------------

window.onload = function() {
    // Initialize Google GSI on page load
    initializeGoogleGSI();
***REMOVED***;

// Google event listeners
googleAuthorizeButton.onclick = handleGoogleAuthClick;
googleSignoutButton.onclick = function() {
    googleAccessToken = null;
    googleUploadButton.disabled = true;
    console.log('Signed out from Google.');
***REMOVED***;
googleUploadButton.onclick = handleGoogleUploadClick;

// Microsoft event listeners
microsoftLoginButton.onclick = handleMicrosoftLogin;
microsoftUploadButton.onclick = handleMicrosoftUploadClick;
