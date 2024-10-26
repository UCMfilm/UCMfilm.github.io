// Google API Client ID and API Key (DO NOT PUSH TO PUBLIC REPOS)
const CLIENT_ID = '71365436814-tj6nv6feqpa75h6rgckee3lkc1kce458.apps.googleusercontent.com'; // Replace with your Client ID
const API_KEY = 'AIzaSyCPOFaeFyHXmq6NnLMJffDxUvZWIrnRsPw'; // Replace with your API Key

// Google Sheets ID and range to read from
const SPREADSHEET_ID = '1noQqSTlx4woOY7tB1c0sQctA3SAZXX6cfDVJLq0VKak'; // Replace with your Spreadsheet ID
const RANGE = 'Google Contacts!A1:E'; // Adjust range as needed

// Authorization scopes
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// Load the auth2 library and API client library
function loadClient() {
    gapi.load('client:auth2', initClient);
}

// Initialize the client with API key and Client ID
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: SCOPES
    }).then(() => {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }).catch(error => console.error("Error initializing client:", error));
}

// Handle login status and load data if signed in
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        fetchData();
    } else {
        console.log("User not signed in");
        document.getElementById('signin-button').style.display = 'block';
    }
}

// Sign in the user
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

// Fetch data from Google Sheets API
function fetchData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
    }).then(response => {
        const data = response.result.values;
        displayData(data);
    }).catch(error => console.error("Error fetching data:", error));
}

// Display data in HTML
function displayData(data) {
    const contactDataDiv = document.getElementById('contactData');
    contactDataDiv.innerHTML = ''; // Clear previous data

    data.forEach((row, index) => {
        const contactDiv = document.createElement("div");
        contactDiv.innerHTML = `
            <h3>${row[0]} ${row[1] || ""}</h3>
            <p>Email: ${row[2] || "N/A"}</p>
            <p>Job Title: ${row[3] || "N/A"}</p>
            <p>Phone: ${row[4] || "N/A"}</p>
        `;
        contactDataDiv.appendChild(contactDiv);
    });
}

// Load client when page is ready
document.addEventListener('DOMContentLoaded', loadClient);
