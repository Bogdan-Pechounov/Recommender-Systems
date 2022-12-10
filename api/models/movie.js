const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movie = new Schema({
  _id: { type: Number },
  title: { type: String, required: true },
  genres: [String],
  backdrop_path: String,
  poster_path: String,
  release_date: String,
  overview: String,
  // precomputed
  rating_count: { type: Number, default: 0 },
  rating_total: { type: Number, default: 0 },
  rating_avg: Number,
  trend_score: Number,
  votes: Number,
})

module.exports = mongoose.model('Movie', movie)
