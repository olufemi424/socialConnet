const express = require("express");
const router = express.Router();

//controller
const UserController = require("../controllers/users");

//middleware
const FBAuth = require("../util/FBAuth");

// AUTH
// User end point
// POST @ localhost:PORT/user/signup
router.post("/signup", UserController.signUp);

// User end point
// POST @ localhost:PORT/user/login
router.post("/login", UserController.login);

// User end point
// POST @ localhost:PORT/user/
// post a new user details
router.post("/", FBAuth, UserController.addUserDetails);

// User end point
// GET @ localhost:PORT/user/
// get authenticated user details
router.get("/", FBAuth, UserController.getAuthenticatedUserDetails);

// User end point
// GET @ localhost:PORT/user/:handle
// get any user details
router.get("/:handle", UserController.getUserDetails);

// User end point
// POST @ localhost:PORT/user/image
// post a new user details
router.post("/image", FBAuth, UserController.uploadImage);

// User end point
// POST @ localhost:PORT/user/notifications
// mark notifications as read @bool from False to True
router.post("/notifications", FBAuth, UserController.markNotificationRead);

module.exports = router;
