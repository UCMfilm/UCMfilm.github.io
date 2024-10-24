const CLIENT_ID = '283831320289-9o8udsvogido7umljk17qhka2v22k9rq.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCVdZgou7mGBXmfJ2N8QQ1lyNNGU4eKWLA';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let authorizeButton = document.getElementById('authorize_button');
let signoutButton = document.getElementById('signout_button');
let uploadButton = document.getElementById('upload_button');
let fileInput = document.getElementById('file_input');

// Load the Google API client
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
***REMOVED***

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    ***REMOVED***).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        uploadButton.onclick = handleUploadClick;
    ***REMOVED***, function (error) {
        console.error('Error initializing Google API client', error);
***REMOVED***
***REMOVED***

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        uploadButton.style.display = 'block';
    ***REMOVED*** else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        uploadButton.style.display = 'none';
    ***REMOVED***
***REMOVED***

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
***REMOVED***

function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
***REMOVED***

function handleUploadClick() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file");
        return;
    ***REMOVED***

    const metadata = {
        name: file.name,
        mimeType: file.type
    ***REMOVED***;

    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' ***REMOVED***));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + accessToken ***REMOVED***),
        body: form
    ***REMOVED***).then((response) => response.json())
      .then((data) => {
          console.log('File uploaded successfully', data);
      ***REMOVED***)
      .catch((error) => console.error('Error uploading file:', error));
***REMOVED***

handleClientLoad();
