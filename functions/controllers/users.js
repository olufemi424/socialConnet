const { db, admin } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const { validateSignUpData, validateLoginData } = require("../util/validators");

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  console.log(newUser);

  // TODO validate data
  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return res.status(400).json(errors);

  //default image
  const noImg = "no-img.png";

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
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                config.storageBucket
              }/o/${noImg}?alt=media`,
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
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  // TODO validate data
  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

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
};

// ADD USER DETAILS
exports.addUserDetails = (req, res) => {};

//UPLOAD USER IMAGE
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUpLoaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpp" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    //extract image
    const imageEntension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageEntension}`;

    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUpLoaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUpLoaded.filePath, {
        resumable: false,
        metadata: {
          contentType: imageToBeUpLoaded.mimetype
        }
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${imageFileName}?alt=media`;

        return db
          .doc(`/users/${req.user.handle}`)
          .update({ imageUrl: imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image Uploaded Successfully" });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.code });
      });
  });

  busboy.end(req.rawBody);
};
