/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const logger = require("firebase-functions/logger");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// async function getPlanets() {

//     const planetsRef = db.collection('planets');
//     const snapshot = await planetsRef.get();
//     const planets = [];
//     snapshot.forEach(doc => {
//         planets.push(doc.id);
//     });
//     return planets;
// }

// exports.getPlanets = onRequest(async (req, res) => {
//     const planets = await getPlanets();
//     console.log('planets:', planets);
// });

// getPlanets();

// exports.updateDatabase = onSchedule("0 0 * * *").timeZone("UTC-5").onRun(async (context) => {
//     // Your code to update the Firestore database goes here
// });