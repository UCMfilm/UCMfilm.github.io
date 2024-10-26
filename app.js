// Listen for messages from the iframe (Google Apps Script)
window.addEventListener("message", (event) => {
    if (event.origin !== "https://script.google.com") return; // Confirm origin
    const data = event.data;  // Parsed JSON data from Google Sheets
    displayData(data);
});

// Function to display fetched data in HTML
function displayData(data) {
    const contactDataDiv = document.getElementById("contactData");
    contactDataDiv.innerHTML = ''; // Clear previous data

    data.forEach(contact => {
        const contactDiv = document.createElement("div");
        contactDiv.innerHTML = `
            <h3>${contact["First name"]} ${contact["Last name"]}</h3>
            <p>Email: ${contact.Email}</p>
            <p>Job Title: ${contact["Job title"]}</p>
            <p>Phone: ${contact.Phone}</p>
            <p>Labels/Groups: ${contact["Labels/Groups"]}</p>
        `;
        contactDataDiv.appendChild(contactDiv);
    });
}
