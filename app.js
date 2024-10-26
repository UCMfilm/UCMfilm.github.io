// Function to fetch data from Google Sheets API with CORS disabled
async function fetchData() {
    const url = 'https://script.google.com/macros/s/AKfycbyCsKkwHje-1JowDoAmcupz4KaDilXv_3W411YBnp3ZoazGFD3GG7c8DpxB81oKKPi4/exec';
    try {
        const response = await fetch(url, { mode: 'no-cors' });  // CORS disabled
        console.log(response);  // Check response status (content will be opaque)

        // No data display because we can't parse JSON in no-cors mode
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display fetched data in HTML
// Note: This function won't be used with no-cors mode, but is here if CORS is resolved
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

// Initial call to fetch data when the page loads
fetchData();
