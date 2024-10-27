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
        // Add console.log to see what data we're getting
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: config.SPREADSHEET_ID,
            range: config.RANGE,
        });
        console.log("Fetched data:", response.result.values); // Add this line
        displayData(response.result.values);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(data) {
    const container = document.getElementById('contactData');
    
    if (!data) {
        console.log("No data received"); // Add this line
        container.innerHTML = '<p>No data available</p>';
        return;
    }

    // Add console.log to see the data structure
    console.log("Displaying data:", data); // Add this line
    
    container.innerHTML = '';
    const root = document.createElement('div');
    container.appendChild(root);

    import('./ContactsTable.js')
        .then(module => {
            const ContactsTable = module.default;
            ReactDOM.render(
                React.createElement(ContactsTable, {
                    contacts: data, // Make sure data is being passed correctly
                    onAddContact: addContact
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
        fetchData();
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