const functions = require('firebase-functions');
const { google ***REMOVED*** = require('googleapis');
const drive = google.drive('v3');
const { OAuth2 ***REMOVED*** = google.auth;


// Use Firebase Config instead of hardcoding
const oAuth2Client = new OAuth2(

  functions.config().google.client_id,      // Client ID from config
  functions.config().google.client_secret,  // Client Secret from config
  'https://ucmfilm.github.io/'              // Your Redirect URL
 e9b44e9 (recomit)
);

// Set access and refresh tokens from Firebase Config
oAuth2Client.setCredentials({
  access_token: functions.config().google.access_token,
  refresh_token: functions.config().google.refresh_token,
ad94113 (recomit)
***REMOVED***);
