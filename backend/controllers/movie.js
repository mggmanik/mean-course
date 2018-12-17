const Movie = require("../models/movie");

exports.createMovie = (req, res) => {
  const url = req.protocol + '://' + req.get("host");
  const movie = new Movie({
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre,
    image_path: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  movie.save()
    .then(() => {
      res.status(201).json({
        message: "Movie Added Successfully!"
      });
    }).catch(err => {
      res.status(500).json({
        message: "Creation of Movie Failed!"
      });
    });
};

exports.updateMovie = (req, res) => {
  let imagePath = req.body.image_path;
  if (req.file) {
    const updatedUrl = req.protocol + '://' + req.get("host");
    imagePath = updatedUrl + "/images/" + req.file.filename;
  }
  const movie = new Movie({
    _id: req.params.id,
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre,
    image_path: imagePath,
    creator: req.userData.userId
  });
  Movie.updateOne({_id: req.params.id, creator: req.userData.userId}, movie)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({message: "Update successful!"});
      } else {
        res.status(401).json({message: "Not Authorized!"});
      }
      console.log(result);
    }).catch(err => {
      res.status(500).json({
        message: "Couldn't update Movie!"
      });
    });
};

exports.getMovies = (req, res) => {
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
    }).catch(err => {
        res.status(500).json({
          message: "Fetching Movies Failed"
        })
      });
  });
};

exports.getMovie = (req, res) => {
  Movie.findById(req.params.id).then(document => {
    res.status(200).json({
      message: "Movie fetched successfully!",
      movie: document
    });
  }).catch(err => {
      res.status(500).json({
        message: "Fetching Movie Failed"
      })
    });
};

exports.deleteMovie = (req, res) => {
  Movie.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0) {
      res.status(200).json({message: "Movie Deleted !"});
    } else {
      res.status(401).json({message: "Not Authorized!"});
    }
    console.log(result);
  }).catch(err => {
    res.status(500).json({
      message: "Fetching Movies Failed"
    });
  });
};
