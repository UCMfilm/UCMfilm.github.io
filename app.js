// Google Sheets API URL
const apiUrl = "https://script.google.com/macros/s/AKfycbx6-_9YcsukySAltqfOGWkpv1BHUPvW3e-EBh8BSVbkaFnX0W24SO1RQ6nMt7jopho/exec";

// Function to display a specific contact's data by name
async function showContactData(firstName) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Find the contact in the fetched data by first name
        const contact = data.find(item => item["First name"] === firstName);

        if (contact) {
            document.getElementById("contactName").textContent = `${contact["First name"]} ${contact["Last name"]}`;
            document.getElementById("contactJobTitle").textContent = `Job Title: ${contact["Job title"]}`;
            document.getElementById("contactEmail").textContent = `Email: ${contact.Email}`;
            document.getElementById("contactPhone").textContent = `Phone: ${contact.Phone}`;
            document.getElementById("contactLabels").textContent = `Labels/Groups: ${contact["Labels/Groups"]}`;
            document.getElementById("contactDetails").style.display = "block";
            document.getElementById("contactList").style.display = "none";
        } else {
            console.log("Contact not found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to return to the contact list view
function backToList() {
    document.getElementById("contactDetails").style.display = "none";
    document.getElementById("contactList").style.display = "block";
}

// Initial data fetch for debugging
fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log("Successfully connected to Google Sheets. Contact entries:", data))
    .catch(error => console.error("Connection to Google Sheets failed:", error));
