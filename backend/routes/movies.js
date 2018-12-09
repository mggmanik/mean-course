const express = require("express");
const multer = require("multer");
const Movie = require("../models/movie");
const checkAuth = require("../middleware/check-auth");
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

router.post("", checkAuth, multer({storage: storage}).single("image"), (req, res) => {
  const url = req.protocol + '://' + req.get("host");
  const movie = new Movie({
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre,
    image_path: url + "/images/" + req.file.filename
  });
  movie.save()
    .then(() => {
      res.status(201).json({
        message: "Movie Added Successfully!"
      });
    });
});

router.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res) => {
  let imagePath = req.body.image_path;
  if (req.file) {
    const updatedUrl = req.protocol + '://' + req.get("host");
    imagePath = updatedUrl + "/images/" + req.file.filename;
  }
  const movie = new Movie({
    _id: req.params.id,
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre,
    image_path: imagePath
  });
  Movie.updateOne({_id: req.params.id}, movie).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!"});
  });
});

router.get("", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const movieQuery = Movie.find();
  let fetchedMovies;
  if (pageSize && currentPage) {
    movieQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }
  movieQuery.then(documents => {
    fetchedMovies = documents;
    return Movie.count();
  }).then(count => {
    res.status(200).json({
      message: "Movies fetched successfully!",
      movies: fetchedMovies,
      maxMovies: count
    });
  });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id).then(document => {
    res.status(200).json({
      message: "Movie fetched successfully!",
      movie: document
    });
  });
});

router.delete("/:id", checkAuth, (req, res) => {
  Movie.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Movie Deleted !"});
  });
});

module.exports = router;
