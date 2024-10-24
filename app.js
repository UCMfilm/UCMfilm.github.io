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
            }
        },
    });
}

// Trigger the authorization flow when the user clicks the Authorize button
function handleAuthClick() {
    tokenClient.requestAccessToken();
}

// Sign out function (invalidate token)
function handleSignoutClick() {
    accessToken = null;
    console.log('Signed out.');
}

// Upload the selected file to Google Drive
function handleUploadClick() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file");
        return;
    }

    // Simplified metadata for debugging
    const metadata = {
        name: file.name  // Only provide the file name for now
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    // Ensure the access token is included in the request headers
    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + accessToken  // Include the access token
        }),
        body: form
    }).then((response) => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.json();
    }).then((data) => {
        console.log('File uploaded successfully', data);
    }).catch((error) => {
        console.error('Error uploading file:', error);
    });
}

// Initialize the GSI client when the page loads
window.onload = initializeGSI;
authorizeButton.onclick = handleAuthClick;
signoutButton.onclick = handleSignoutClick;
uploadButton.onclick = handleUploadClick;
