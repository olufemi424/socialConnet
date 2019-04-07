const functions = require("firebase-functions");
const firebase = require("firebase");

const { db } = require("./util/admin");

//middleware
const FBAuth = require("./util/FBAuth");

//controllers
const ScreamsController = require("./controllers/screams");
const UserController = require("./controllers/users");

// SET UP EXPRESS
const express = require("express");
const app = express();

// const bodyParser = require("body-parser");
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());

// SCREAMS
app.get("/screams", ScreamsController.getAllScreams);
app.post("/scream", FBAuth, ScreamsController.postOneScream);
app.get("/scream/:screamId", ScreamsController.getScream);
app.delete("/scream/:screamId", FBAuth, ScreamsController.deleteScream);
app.post("/scream/like/:screamId", FBAuth, ScreamsController.likeScream);
app.post("/scream/unlike/:screamId", FBAuth, ScreamsController.unlikeScream);
app.post(
  "/scream/comment/:screamId",
  FBAuth,
  ScreamsController.commentOnScream
);

// AUTH
app.post("/signup", UserController.signUp);
app.post("/login", UserController.login);

//USER
app.post("/user", FBAuth, UserController.addUserDetails);
app.get("/user", FBAuth, UserController.getAuthenticatedUserDetails);
app.get("/user/:handle", UserController.getUserDetails);
app.post("/user/image", FBAuth, UserController.uploadImage);
app.post("/user/notifications", FBAuth, UserController.markNotificationRead);

// https://baseurl.com/api
exports.api = functions.https.onRequest(app);

exports.createNotificationsOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(snapshot => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  });

exports.createNotificationsOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete(snapshot => {
    db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  });

exports.createNotificationsOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate(snapshot => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  });
