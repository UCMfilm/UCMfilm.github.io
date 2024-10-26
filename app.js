function fetchData() {
    console.log("Starting data fetch...");

    const url = 'https://script.google.com/macros/s/AKfycbyCsKkwHje-1JowDoAmcupz4KaDilXv_3W411YBnp3ZoazGFD3GG7c8DpxB81oKKPi4/exec';

    fetch(url)
        .then(response => {
            console.log("Received response:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            const contactDataDiv = document.getElementById('contactData');
            if (!contactDataDiv) {
                console.error("Element with id 'contactData' not found.");
                return;
            }

            contactDataDiv.innerHTML = ''; // Clear previous data

            if (!Array.isArray(data) || data.length === 0) {
                console.warn("No data available or data is not in array format:", data);
                contactDataDiv.innerHTML = "<p>No contacts found.</p>";
                return;
            }

            data.forEach((contact, index) => {
                console.log(`Processing contact ${index + 1}:`, contact);

                if (!contact["First name"] || !contact.Email) {
                    console.warn(`Incomplete contact data at index ${index}:`, contact);
                    return;
                }

                const contactElement = document.createElement('p');
                contactElement.textContent = `${contact["First name"]} ${contact["Last name"] || ""}: ${contact.Email}`;
                contactDataDiv.appendChild(contactElement);
            });

            console.log("Data displayed successfully.");
        })
        .catch(error => {
            console.error("Error fetching data:", error);

            const contactDataDiv = document.getElementById('contactData');
            if (contactDataDiv) {
                contactDataDiv.innerHTML = "<p>Error loading contacts. Please try again later.</p>";
            }
        });
}
