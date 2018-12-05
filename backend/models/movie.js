const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  movie_name: {type: String, required: true},
  movie_genre: {type: String, required: true},
  image_path: {type: String, required: true}
});

module.exports = mongoose.model('Movie', movieSchema);
