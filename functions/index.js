const functions = require("firebase-functions");
const { google ***REMOVED*** = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  functions.config().google.client_id,
  functions.config().google.client_secret,
  "https://your-redirect-url" // Your OAuth2 redirect URL
);

// Set credentials with access and refresh token
oAuth2Client.setCredentials({
  access_token: "ya29.a0AcM612z18bWecrkX9YXuzQ_a39nbH47xs1o1Nkc7zy61ryrt8E4c3mFO98yDoPcDXpB3bR1xuGaDULfT7fZjxg9st6XQfTiE6NVHMOtQ7GT4xf1ClbNiwUSIAmWWazA4CbfIEQ28655hD6MXTpcUjlruVfxeq13rpGwnnvTQaCgYKAfcSARESFQHGX2Mi-UD7S4S_5cYhCHtA1gEW5Q0175",
  refresh_token: "1//03LbJJud-7b6CCgYIARAAGAMSNwF-L9IrMXHW-fbbIceHj2vj7LL-LYu1DW438VzBOdVCF-l_1bFyghrvvXuAMkHb-gr9KvPGa3w"
***REMOVED***);

// Refresh token if access token is expired
oAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // Store the new refresh token securely
    console.log("New refresh token: ", tokens.refresh_token);
  ***REMOVED***
  console.log("New access token: ", tokens.access_token);
***REMOVED***);

exports.listDriveFiles = functions.https.onRequest(async (req, res) => {
  try {
    const drive = google.drive({ version: "v3", auth: oAuth2Client ***REMOVED***);
    const response = await drive.files.list({
      pageSize: 10,
      fields: "files(id, name)"
***REMOVED***
    res.status(200).json(response.data.files);
  ***REMOVED*** catch (error) {
    console.error("Error listing files: ", error);
    res.status(500).send("Error listing files.");
  ***REMOVED***
***REMOVED***);
