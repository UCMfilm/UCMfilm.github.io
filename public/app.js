import { config } from './config.js';

let tokenClient;
let accessToken = null;

function handleAuthClick() {
    if (tokenClient) {
        tokenClient.requestAccessToken();
    } else {
        console.error("Token client not initialized.");
    }
}

window.handleAuthClick = handleAuthClick;

function loadClient() {
    gapi.load('client', async () => {
        try {
            await gapi.client.init({
                apiKey: config.API_KEY,
                discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            });
            console.log("Google API client initialized.");
            initializeTokenClient();
        } catch (error) {
            console.error("Error initializing client:", error);
        }
    });
}

function initializeTokenClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: config.CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
                accessToken = tokenResponse.access_token;
                fetchData();
            }
        },
    });
}

async function fetchData() {
    if (!accessToken) {
        console.error("Access token is not available.");
        return;
    }

    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: config.SPREADSHEET_ID,
            range: config.RANGE,
        });
        console.log("Fetched data:", response.result.values);
        displayData(response.result.values);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(data) {
    const container = document.getElementById('contactData');
    
    if (!data) {
        console.log("No data received");
        container.innerHTML = '<p>No data available</p>';
        return;
    }

    console.log("Displaying data:", data);

    container.innerHTML = ''; // Clear previous content
    const root = document.createElement('div');
    container.appendChild(root);

    import('./ContactsTable.js')
        .then(module => {
            const ContactsTable = module.default;
            ReactDOM.render(
                React.createElement(ContactsTable, {
                    contacts: data,
                    onAddContact: addContact  // Ensure this is correctly assigned
                }),
                root
            );
        })
        .catch(error => {
            console.error('Error loading ContactsTable:', error);
            container.innerHTML = '<p>Error loading contacts table</p>';
        });
}

async function addContact(newContact) {
    console.log("Attempting to add new contact:", newContact); // Log when adding contact

    try {
        const response = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: config.SPREADSHEET_ID,
            range: config.RANGE,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [newContact]
            }
        });
        console.log('Contact added:', response);
        fetchData(); // Refresh data to show the new contact
    } catch (error) {
        console.error('Error adding contact:', error);
        alert('Failed to add contact. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('signInButton');
    signInButton.addEventListener('click', handleAuthClick);
    loadClient();
});
