const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Movie = require("./models/movie");

const app = express();

mongoose
  .connect("mongodb+srv://mggmanik:EBZWG86kwjyVAI2a@cluster0-seypl.mongodb.net/node-angular?retryWrites=true", {useNewUrlParser: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/movie", (req, res, next) => {
  const movie = new Movie({
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre
  });
  movie.save()
    .then(addedMovie => {
      res.status(201).json({
        message: "Movie Added Successfully!"
      });
    });
});

app.get("/api/movie", (req, res, next) => {
  Movie.find().then(documents => {
    res.status(200).json({
      message: "Movies fetched successfully!",
      movies: documents
    });
  });
});

app.delete("/api/movie/:id", (req, res, next) => {
  Movie.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Movie Deleted !"});
  });
});

module.exports = app;
