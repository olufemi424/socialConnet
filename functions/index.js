const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");

// SET UP EXPRESS
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//INIT FIREBASE ADMIN
admin.initializeApp();

const config = {
  apiKey: "AIzaSyAC4pZmg64boipUMfX-tGBm0_ithKb0hmM",
  authDomain: "socialconnect-ad8d3.firebaseapp.com",
  databaseURL: "https://socialconnect-ad8d3.firebaseio.com",
  projectId: "socialconnect-ad8d3",
  storageBucket: "socialconnect-ad8d3.appspot.com",
  messagingSenderId: "138388259411"
};

// CONNECT FIREBASE PROJECT TO APP
firebase.initializeApp(config);

const db = admin.firestore();

//GET REQUEST FOR ALL SCREAMS FROM SCREAMS COLLECTION
app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount
        });
      });
      return res.status(200).json(screams);
    })
    .catch(err => console.log(err));
});

//POST REQUEST FOR NEW SCREAMS
app.post("/scream", (req, res) => {
  //   CREATE A NEW SCREAMS
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  // CONNECT AND SEND DATA
  db.collection("screams")
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch(err => {
      res.status(500).json({
        error: "Something went wrong"
      });
      console.log(err);
    });
});

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

// SIGNUP ROUTE
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Email is required";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(newUser.password)) errors.password = "Password is required";
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = "Password must match";
  if (isEmpty(newUser.handle)) errors.password = "Handle is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  // TODO validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({
          handle: "Handle is already taken"
        });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
          })
          .then(userToken => {
            token = userToken;

            // create new user for collection
            const userCredentials = {
              handle: newUser.handle,
              email: newUser.email,
              createdAt: new Date().toISOString(),
              userId: userId
            };
            // save in db
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
          })
          .then(() => {
            return res.status(201).json({ token });
          })
          .catch(err => {
            if ((err.code = "auth/email-already-in-use")) {
              return res
                .status(400)
                .json({ email: "Failed, Use a different Email" });
            }
            console.log(err);
            res.status(500).json({ error: err.code });
          });
      }
    });
});

app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  let errors = {};

  //validation
  if (isEmpty(user.email)) errors.email = "Email is required";
  if (isEmpty(user.password)) errors.email = "Password is required";
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      }

      res.status(500).json({ errors });
    });
});

// https://baseurl.com/api
exports.api = functions.https.onRequest(app);
