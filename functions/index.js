const functions = require("firebase-functions");
const { google ***REMOVED*** = require("googleapis");

// Initialize OAuth2 client with the Firebase environment variables
const oAuth2Client = new google.auth.OAuth2(
  functions.config().google.client_id,
  functions.config().google.client_secret,
  "https://ucmfilm-c6bfe.firebaseapp.com/__/auth/handler"  // Replace with your actual redirect URI from Firebase
);

// Cloud Function to list Google Drive files
exports.listDriveFiles = functions.https.onRequest(async (req, res) => {
  try {
    // Check if the access token is provided in the request (passed from the frontend)
    const { accessToken ***REMOVED*** = req.query;

    if (!accessToken) {
      return res.status(400).send("Access token is required.");
    ***REMOVED***

    // Set the access token for the OAuth2 client
    oAuth2Client.setCredentials({
      access_token: accessToken,
***REMOVED***

    // Create the Google Drive instance
    const drive = google.drive({ version: "v3", auth: oAuth2Client ***REMOVED***);

    // List the files from Google Drive
    const response = await drive.files.list({
      pageSize: 10,  // Number of files to list
      fields: "nextPageToken, files(id, name)",  // Retrieve file IDs and names
***REMOVED***

    // Send the list of files in the response
    res.status(200).send(response.data.files || "No files found.");
  ***REMOVED*** catch (error) {
    console.error("Error listing files: ", error);
    res.status(500).send("Error listing files.");
  ***REMOVED***
***REMOVED***);
