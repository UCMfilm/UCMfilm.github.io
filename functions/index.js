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
