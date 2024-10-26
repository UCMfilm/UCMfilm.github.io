// Listen for messages from the iframe (Google Apps Script)
window.addEventListener("message", (event) => {
    if (event.origin !== "https://script.google.com") {
        console.error("Origin mismatch. Expected 'https://script.google.com', but received:", event.origin);
        return;
    }

    console.log("Data received from Apps Script:", event.data);
    displayData(event.data);
});

// Function to display fetched data in HTML
function displayData(data) {
    const contactDataDiv = document.getElementById("contactData");
    contactDataDiv.innerHTML = ''; // Clear previous data

    data.forEach((contact, index) => {
        const contactDiv = document.createElement("div");
        contactDiv.innerHTML = `
            <h3>${contact["First name"]} ${contact["Last name"] || ""}</h3>
            <p>Email: ${contact.Email}</p>
            <p>Job Title: ${contact["Job title"] || "N/A"}</p>
            <p>Phone: ${contact.Phone || "N/A"}</p>
            <p>Labels/Groups: ${contact["Labels/Groups"] || "N/A"}</p>
        `;
        contactDataDiv.appendChild(contactDiv);
    });

    console.log("Data displayed successfully.");
}
