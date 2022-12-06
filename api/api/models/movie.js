const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movie = new Schema({
  movieId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  genres: [String],
  backdrop_path: String,
  poster_path: String,
  release_date: String,
  overview: String,
})

module.exports = mongoose.model('Movie', movie)
