const admin = require("firebase-admin");

//INIT FIREBASE ADMIN
admin.initializeApp();

//db
const db = admin.firestore();

module.exports = { admin, db };
