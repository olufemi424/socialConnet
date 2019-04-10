const admin = require("firebase-admin");

//INIT FIREBASE ADMIN
admin.initializeApp();

// firebase
const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

//db
const db = admin.firestore();

module.exports = { admin, db, firebase, config };
