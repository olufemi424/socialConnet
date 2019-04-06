const functions = require("firebase-functions");
const firebase = require("firebase");

//middleware
const FBAuth = require("./util/fbAuth");

//controllers
const { getAllScreams, postOneScream } = require("./controllers/screams");
const {
  signUp,
  login,
  uploadImage,
  addUserDetails
} = require("./controllers/users");

// SET UP EXPRESS
const express = require("express");
const app = express();

// const bodyParser = require("body-parser");
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());

//GET REQUEST FOR ALL SCREAMS FROM SCREAMS COLLECTION
app.get("/screams", getAllScreams);
//POST REQUEST FOR NEW SCREAMS
app.post("/scream", FBAuth, postOneScream);
//UPLOAD IMAGE
app.post("/user/image", FBAuth, uploadImage);
//ADD USER DETAILS
app.post("/user", FBAuth, addUserDetails);

// SIGNUP ROUTE
app.post("/signup", signUp);
//LOGIN ROUTE
app.post("/login", login);

// https://baseurl.com/api
exports.api = functions.https.onRequest(app);
