const express = require("express");
const router = express.Router();

//controller
const ScreamsController = require("../controllers/screams");

//middleware
//check authorization
const FBAuth = require("../util/FBAuth");

//SCREAM ROUTES
// SCREAM end point
// GET @ localhost:PORT/scream/all
// Get all users screams @notprotected
router.get("/all", ScreamsController.getAllScreams);

// SCREAM end point
// POST @ localhost:PORT/scream/
// Post a new scream @protected
router.post("/", FBAuth, ScreamsController.postOneScream);

// SCREAM end point
// GET @ localhost:PORT/scream/:screamID
// Get screams by ID @notprotected
router.get("/:screamId", ScreamsController.getScream);

// SCREAM end point
// DELETE @ localhost:PORT/scream/:screamID
// Delete scream by id @protected
router.delete("/:screamId", FBAuth, ScreamsController.deleteScream);

// SCREAM end point
// POST @ localhost:PORT/scream/all
// Like a single scream @protected
router.post("/like/:screamId", FBAuth, ScreamsController.likeScream);

// SCREAM end point
// POST @ localhost:PORT/scream/unlike/:screamId
// Unlike a single scream @protected
router.post("/unlike/:screamId", FBAuth, ScreamsController.unlikeScream);

// SCREAM end point
// POST @ localhost:PORT/scream/all
// post comment on a single scream @protected
router.post("/comment/:screamId", FBAuth, ScreamsController.commentOnScream);

module.exports = router;
