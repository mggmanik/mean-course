const express = require("express");
const checkAuth = require("../middleware/check-auth");
const MovieController = require("../controllers/movie");
const extractFile = require("../middleware/file");
const router = express.Router();

router.post("", checkAuth, extractFile, MovieController.createMovie);

router.put("/:id", checkAuth, extractFile, MovieController.updateMovie);

router.get("", MovieController.getMovies);

router.get("/:id", MovieController.getMovie);

router.delete("/:id", checkAuth, MovieController.deleteMovie);

module.exports = router;
