const CLIENT_ID = '71365436814-tj6nv6feqpa75h6rgckee3lkc1kce458.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCPOFaeFyHXmq6NnLMJffDxUvZWIrnRsPw';
const SPREADSHEET_ID = '1noQqSTlx4woOY7tB1c0sQctA3SAZXX6cfDVJLq0VKak';
const RANGE = 'Google Contacts!A1:F';

let tokenClient;
let accessToken = null;

function loadClient() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        console.log("Google API client initialized.");
    }).catch(error => console.error("Error initializing client:", error));

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        callback: (tokenResponse) => {
            accessToken = tokenResponse.access_token;
            fetchData();
        },
    });
}

function handleAuthClick() {
    tokenClient.requestAccessToken();
}

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

document.addEventListener('DOMContentLoaded', loadClient);
