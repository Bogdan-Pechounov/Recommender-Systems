const { Router } = require('express')
const Movie = require('../models/movie')

const router = Router()

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const movies = await Movie.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ movieId: 1 })
    .exec()
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await Movie.findOne({ movieId: id })
  res.send(movie)
})

router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.send(movie)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/', async (req, res) => {
  const { movieId } = req.body
  const msg = await Movie.updateOne({ movieId }, req.body)
  res.send(msg)
})

module.exports = router
