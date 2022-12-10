const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rating = new Schema(
  {
    userId: { type: Number, required: true },
    movieId: { type: Number, required: true },
    rating: { type: Number, required: true },
    timestamp: { type: Number, required: true },
  },
  { _id: false }
)

module.exports = mongoose.model('Rating', rating)
