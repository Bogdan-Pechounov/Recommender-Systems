const { Router } = require('express')
const Movie = require('../models/movie')
const Rating = require('../models/rating')
const router = Router()

// router.post('/', async (req, res) => {
//   try {
//     const rating = await Rating.create(req.body)
//     const movie = await Movie.findOne({ movieId: rating.movieId })
//     movie.rating_count += 1
//     movie.rating_total += rating.rating
//     await movie.save()
//     res.send(rating)
//   } catch (err) {
//     console.log(err)
//     res.status(400).send(err)
//   }
// })
// too slow, simply import csv using mongoimport

module.exports = router
