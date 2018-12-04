const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();

router.post("", (req, res) => {
  const movie = new Movie({
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre
  });
  movie.save()
    .then(() => {
      res.status(201).json({
        message: "Movie Added Successfully!"
      });
    });
});

router.put("/:id", (req, res) => {
  const movie = new Movie({
    _id: req.params.id,
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre
  });
  Movie.updateOne({_id: req.params.id}, movie).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!"});
  });
});

router.get("", (req, res) => {
  Movie.find().then(documents => {
    res.status(200).json({
      message: "Movies fetched successfully!",
      movies: documents
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

router.delete("/:id", (req, res) => {
  Movie.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Movie Deleted !"});
  });
});

module.exports = router;
