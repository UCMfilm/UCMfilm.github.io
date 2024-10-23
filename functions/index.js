/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall***REMOVED*** = require("firebase-functions/v2/https");
 * const {onDocumentWritten***REMOVED*** = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest***REMOVED*** = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true***REMOVED***);
//   response.send("Hello from Firebase!");
// ***REMOVED***);
const functions = require("firebase-functions");
const { google ***REMOVED*** = require("googleapis");
const drive = google.drive("v3");
const { OAuth2 ***REMOVED*** = google.auth;

// Set up OAuth2 credentials (replace with your credentials)
const functions = require("firebase-functions");
const { google ***REMOVED*** = require("googleapis");
const drive = google.drive("v3");
const { OAuth2 ***REMOVED*** = google.auth;

// Set up OAuth2 credentials (replace with your actual credentials)
const oAuth2Client = new OAuth2(
  "407408718192.apps.googleusercontent.com",   // Your Client ID
  "YOUR_CLIENT_SECRET",                         // Your Client Secret
  "https://developers.google.com/oauthplayground"  // Your Redirect URL
);

// Set access and refresh tokens
oAuth2Client.setCredentials({
  access_token: "ya29.a0AcM612xiTngiXgSU-0ieK-wGPvnVkP4g_LYNBTlBnJPNZeZFIKTcmsFAeAESN1xet7B_0o4kw2ig7Ar7th8_x6AVNHaQbb0JAgxN0mysjnTtQLuR-std8KcEkxlYD4Txxm2Ub7ABXQ29_TeJvY7x1295nx1r2LRIviBjrzUtaCgYKAWMSARESFQHGX2MiG9SbbgLTgNATEAxusmMNvA0175",  // Your Access Token
  refresh_token: "1//04EcdxXMNkkdPCgYIARAAGAQSNwF-L9IrCYKvbycA6YQ0T3U-Nq3-u6dc93mZvAx-iwyBgPFcnuCK9pDa4nJ4RMglpf5FukaHNNY", // Your Refresh Token
  scope: "https://www.googleapis.com/auth/drive",
  token_type: "Bearer",
  expiry_date: 3599000  // Use your token expiration
***REMOVED***);

// Cloud Function to list Google Drive files
exports.listDriveFiles = functions.https.onRequest(async (req, res) => {
  try {
    const response = await drive.files.list({
      auth: oAuth2Client,
      pageSize: 10,  // Adjust as needed
      fields: "files(id, name)"
***REMOVED***
    res.status(200).send(response.data.files || "No files found.");
  ***REMOVED*** catch (error) {
    console.error("Error listing files: ", error);
    res.status(500).send("Error listing files.");
  ***REMOVED***
***REMOVED***);
