const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const RANGE = import.meta.env.VITE_RANGE;

let tokenClient;
let accessToken = null;

// Load and initialize Google API client and GIS
function loadClient() {
    gapi.load('client', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
            console.log("Google API client initialized.");
            initializeTokenClient(); // Initialize GIS after API client is ready
        }).catch(error => console.error("Error initializing client:", error));
    });
}

// Initialize Google Identity Services for authentication
function initializeTokenClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        callback: (tokenResponse) => {
            accessToken = tokenResponse.access_token;
            fetchData(); // Fetch data after sign-in
        },
    });
}

// Trigger GIS for sign-in
function handleAuthClick() {
    if (tokenClient) {
        tokenClient.requestAccessToken();
    } else {
        console.error("Token client not initialized.");
    }
}

// Fetch data from Google Sheets API
function fetchData() {
    if (!accessToken) {
        console.error("Access token is not available.");
        return;
    }

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
    contactDataDiv.innerHTML = '';

    data.forEach(row => {
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

// Start loading the client library once the page is ready
document.addEventListener('DOMContentLoaded', loadClient);
