const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const MovieController = require("../controllers/movie");
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  }
});

router.post("", checkAuth, multer({storage: storage}).single("image"), MovieController.createMovie);

router.put("/:id", checkAuth, multer({storage: storage}).single("image"), MovieController.updateMovie);

router.get("", MovieController.getMovies);

router.get("/:id", MovieController.getMovie);

router.delete("/:id", checkAuth, MovieController.deleteMovie);

module.exports = router;
