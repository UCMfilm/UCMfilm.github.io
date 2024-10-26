// Import required packages
require('dotenv').config();  // Load environment variables from .env file
const azure = require('azure-storage');  // Import Azure Storage SDK

// Retrieve the connection string from the environment variables
const connectionString = process.env.CONNECTION_STRING;
const tableService = azure.createTableService(connectionString);

// Specify the name of the Azure Table
const tableName = 'projects';

// Function to display a specific project's data by name
function showProjectData(projectName) {
    // Query Azure Table Storage for a specific project based on PartitionKey
    const query = new azure.TableQuery().where('PartitionKey eq ?', projectName);

    tableService.queryEntities(tableName, query, null, (error, result) => {
        if (error) {
            console.error("Error fetching project data:", error);
            document.getElementById("output").innerText = "Error fetching data.";
        } else if (result.entries.length > 0) {
            const project = result.entries[0]; // Assuming project name (PartitionKey) is unique
            document.getElementById("projectName").textContent = project.PartitionKey._;
            document.getElementById("projectDescription").textContent = project.description._;
            document.getElementById("projectStatus").textContent = `Status: ${project.status._}`;
            document.getElementById("projectDetails").style.display = "block";
            document.getElementById("projectList").style.display = "none";
        } else {
            console.log("Project not found.");
        }
    });
}


// Function to return to the project list view
function backToList() {
    document.getElementById("projectDetails").style.display = "none";
    document.getElementById("projectList").style.display = "block";
}

// Debugging: Test the connection by listing all projects in the table
tableService.queryEntities(tableName, new azure.TableQuery(), null, (error, result) => {
    if (error) {
        console.error("Connection to Azure Table Storage failed:", error);
    } else {
        console.log("Successfully connected to Azure Table Storage. Project entries:", result.entries);
    }
});
