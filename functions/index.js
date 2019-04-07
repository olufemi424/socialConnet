const functions = require("firebase-functions");
const firebase = require("firebase");

// SET UP EXPRESS
const express = require("express");
const app = express();

//ROUTES
const userRoutes = require("./api/routes/user");
const screamRoutes = require("./api/routes/screams");

//DATABASE
const { db } = require("./api/util/admin");

// const bodyParser = require("body-parser");
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());

//USER
app.use("/user", userRoutes);
// SCREAMS
app.use("/scream", screamRoutes);

// https://baseurl.com/api
exports.api = functions.https.onRequest(app);

exports.createNotificationsOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(snapshot => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
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
      .catch(err => {
        console.log(err);
      });
  });

exports.createNotificationsOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.log(err);
      });
  });

exports.createNotificationsOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate(snapshot => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
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
      .catch(err => {
        console.log(err);
      });
  });
