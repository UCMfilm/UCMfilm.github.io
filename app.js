function fetchData() {
    // Your code to fetch data here.  Example using fetch API:
    fetch('your-data-source-url')
      .then(response => response.json())
      .then(data => {
        // Process the data and update the HTML
        const contactDataDiv = document.getElementById('contactData');
        contactDataDiv.innerHTML = ''; // Clear previous data
  
        data.forEach(contact => {
          const contactElement = document.createElement('p');
          contactElement.textContent = `${contact.name}: ${contact.email}`;
          contactDataDiv.appendChild(contactElement);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error appropriately, e.g., display an error message to the user
      });
  }