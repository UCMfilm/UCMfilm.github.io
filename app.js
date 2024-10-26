async function fetchData() {
    const url = 'https://script.google.com/macros/s/AKfycbxlxQ_7KsgkhbBJqD5YOAYtuNlGfmDUsh-VnQCId0bz7Sds3DpAI-M_QsmMN_MXN1aB/exec';
    try {
        const response = await fetch(url);  // No 'no-cors' mode here
        const data = await response.json();  // Parse JSON if CORS is resolved
        displayData(data);  // Display the data
    } catch (error) {
        console.error('Error fetching data:', error);
    }

// Function to Display Data in HTML (Optional)
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
