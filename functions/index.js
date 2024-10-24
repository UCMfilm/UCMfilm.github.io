const functions = require("firebase-functions");
const { google ***REMOVED*** = require("googleapis");

// Initialize OAuth2 client with the Firebase credentials
const oAuth2Client = new google.auth.OAuth2(
  functions.config().google.client_id,
  functions.config().google.client_secret,
  "https://ucmfilm-c6bfe.firebaseapp.com/__/auth/handler"  // Redirect URI (modify as needed)
);

// Cloud Function to list Google Drive files
exports.listDriveFiles = functions.https.onRequest(async (req, res) => {
  try {
    // Use the OAuth2 client to make an API call
    const drive = google.drive({ version: 'v3', auth: oAuth2Client ***REMOVED***);
    const response = await drive.files.list({
      pageSize: 10,
      fields: "files(id, name)"
***REMOVED***
    res.status(200).send(response.data.files || "No files found.");
  ***REMOVED*** catch (error) {
    console.error("Error listing files: ", error);
    res.status(500).send("Error listing files.");
  ***REMOVED***
***REMOVED***);
