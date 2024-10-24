const functions = require("firebase-functions");
const { google ***REMOVED*** = require("googleapis");
const cors = require("cors")({ origin: true ***REMOVED***);  // Enable CORS for all origins

// Initialize OAuth2 client with Firebase environment variables
const oAuth2Client = new google.auth.OAuth2(
  functions.config().google.client_id,
  functions.config().google.client_secret,
  "https://ucmfilm-c6bfe.firebaseapp.com/__/auth/handler"
);

// Cloud Function to list Google Drive files
exports.listDriveFiles = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {  // Wrap function logic with CORS
    try {
      const { accessToken ***REMOVED*** = req.query;

      if (!accessToken) {
        return res.status(400).send("Access token is required.");
      ***REMOVED***

      oAuth2Client.setCredentials({ access_token: accessToken ***REMOVED***);

      const drive = google.drive({ version: "v3", auth: oAuth2Client ***REMOVED***);

      const response = await drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
  ***REMOVED***

      res.status(200).send(response.data.files || "No files found.");
    ***REMOVED*** catch (error) {
      console.error("Error listing files:", error);
      res.status(500).send("Error listing files.");
    ***REMOVED***
  ***REMOVED***);
***REMOVED***);
