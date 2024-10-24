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
            }
        },
    });
}

// Trigger Google authorization flow
function handleGoogleAuthClick() {
    googleTokenClient.requestAccessToken();
}

// Google Drive file list
document.getElementById('list_files_button').addEventListener('click', listFiles);

function listFiles() {
    const url = `https://us-central1-ucmfilm-c6bfe.cloudfunctions.net/listDriveFiles?accessToken=${googleAccessToken}`;
  
    if (!googleAccessToken) {
      alert("Please authorize access to Google Drive first.");
      return;
    }
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Failed to fetch. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Files from Google Drive:", data);
        displayGoogleFiles(data);  // Assuming you have a function to display files
      })
      .catch(error => {
        console.error('Error fetching files:', error);
        alert('Failed to list files from Google Drive.');
      });
  }
  

function displayGoogleFiles(files) {
    const fileListDiv = document.getElementById('file_list');
    fileListDiv.innerHTML = '';  // Clear previous list

    if (files.length === 0) {
        fileListDiv.innerHTML = 'No files found.';
        return;
    }

    const ul = document.createElement('ul');
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = `${file.name} (ID: ${file.id})`;
        ul.appendChild(li);
    });
    fileListDiv.appendChild(ul);
}

// Google Drive file upload
function handleGoogleUploadClick() {
    const file = googleFileInput.files[0];
    if (!file) {
        alert("Please select a file for Google Drive.");
        return;
    }

    const metadata = { name: file.name };
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + googleAccessToken }),
        body: form
    }).then((response) => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.json();
    }).then((data) => {
        console.log('File uploaded to Google Drive successfully:', data);
    }).catch((error) => {
        console.error('Error uploading to Google Drive:', error);
        alert('Failed to upload file to Google Drive.');
    });
}

// Google signout
googleSignoutButton.onclick = function() {
    google.accounts.oauth2.revoke(googleAccessToken, () => {
        console.log('User signed out from Google.');
        googleAccessToken = null;
        googleUploadButton.disabled = true;
    });
};

// ------------------------ Microsoft OneDrive Setup ------------------------

const msalConfig = {
    auth: {
        clientId: '623e2399-7ec0-44fb-87b7-776e7c84e442',  // Replace with your Microsoft Client ID
        authority: 'https://login.microsoftonline.com/edcb846b-282a-41d3-9672-a2de8956a0f1',  // Replace with your Tenant ID
        redirectUri: 'https://ucmfilm.github.io/'  // Your redirect URI (GitHub Pages URL)
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
let microsoftAccessToken = null;
let microsoftLoginButton = document.getElementById('microsoft_login_button');
let microsoftFileInput = document.getElementById('microsoft_file_input');
let microsoftUploadButton = document.getElementById('microsoft_upload_button');

// Authentication scopes for OneDrive
const microsoftLoginRequest = {
    scopes: ['Files.ReadWrite', 'Files.ReadWrite.All']
};

// Microsoft login
function handleMicrosoftLogin() {
    msalInstance.loginPopup(microsoftLoginRequest)
        .then(response => {
            console.log("Microsoft login successful");
            microsoftAccessToken = response.accessToken;
            microsoftUploadButton.disabled = false;  // Enable OneDrive upload button
        })
        .catch(error => {
            console.error("Error during Microsoft login", error);
            alert('Failed to login to Microsoft OneDrive.');
        });
}

// Microsoft OneDrive file list
document.getElementById('list_files_button_microsoft').addEventListener('click', listMicrosoftFiles);

function listMicrosoftFiles() {
    fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + microsoftAccessToken
        }
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.json();
    }).then(data => {
        displayMicrosoftFiles(data.value);  // data.value contains the array of files
    }).catch(error => {
        console.error('Error fetching Microsoft OneDrive files:', error);
        alert('Failed to list files from Microsoft OneDrive.');
    });
}

function displayMicrosoftFiles(files) {
    const fileListDiv = document.getElementById('file_list_microsoft');
    fileListDiv.innerHTML = '';  // Clear previous list

    if (files.length === 0) {
        fileListDiv.innerHTML = 'No files found in OneDrive.';
        return;
    }

    const ul = document.createElement('ul');
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = `${file.name} (ID: ${file.id})`;
        ul.appendChild(li);
    });
    fileListDiv.appendChild(ul);
}

// Upload file to OneDrive
function handleMicrosoftUploadClick() {
    const file = microsoftFileInput.files[0];
    if (!file) {
        alert("Please select a file for OneDrive.");
        return;
    }

    const uploadUrl = 'https://graph.microsoft.com/v1.0/me/drive/root:/' + file.name + ':/content';

    fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + microsoftAccessToken,
            'Content-Type': file.type
        },
        body: file
    }).then((response) => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
        return response.json();
    }).then((data) => {
        console.log('File uploaded to OneDrive successfully:', data);
    }).catch((error) => {
        console.error('Error uploading to OneDrive:', error);
        alert('Failed to upload file to OneDrive.');
    });
}

// Microsoft logout
function handleMicrosoftLogout() {
    msalInstance.logoutPopup({
        postLogoutRedirectUri: 'https://ucmfilm.github.io/'  // Redirect back to homepage after logout
    });
}

// ------------------------ Event Listeners ------------------------

window.onload = function() {
    // Initialize Google GSI on page load
    initializeGoogleGSI();
};

// Google event listeners
googleAuthorizeButton.onclick = handleGoogleAuthClick;
googleUploadButton.onclick = handleGoogleUploadClick;

// Microsoft event listeners
microsoftLoginButton.onclick = handleMicrosoftLogin;
microsoftUploadButton.onclick = handleMicrosoftUploadClick;
document.getElementById('microsoft_logout_button').onclick = handleMicrosoftLogout;
