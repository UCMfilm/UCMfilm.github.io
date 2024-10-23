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

// Set up OAuth2 from Google APIs
const { google ***REMOVED*** = require("googleapis");
const drive = google.drive("v3");
const { OAuth2 ***REMOVED*** = google.auth;

// Cloud Function to list Google Drive files
exports.listDriveFiles = onRequest(async (req, res) => {
  try {
    const oAuth2Client = new OAuth2(
      process.env.CLIENT_ID, // Reference client ID from environment variables
      process.env.CLIENT_SECRET, // Reference client secret from environment variables
      process.env.REDIRECT_URL // Your redirect URL
    );

    oAuth2Client.setCredentials({
      access_token: process.env.ACCESS_TOKEN, // Using tokens from environment variables
      refresh_token: process.env.REFRESH_TOKEN,
      scope: "https://www.googleapis.com/auth/drive",
      token_type: "Bearer",
      expiry_date: process.env.EXPIRY_DATE // Optional if you're using refresh token mechanism
***REMOVED***

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
