const { Router } = require('express')
const Movie = require('../models/movie')

const router = Router()

function mapToSortQuery(sort, search) {
  if (sort == 'recent') {
    return { release_date: -1 }
  } else if (sort == 'popular') {
    return { rating_total: -1 }
  } else if (sort == 'best') {
    return { votes: -1 }
  } else if (sort == 'top') {
    return { rating_avg: -1 }
  } else if (sort == 'trending') {
    return { trend_score: -1 }
  } else if (search) {
    return {
      score: { $meta: 'textScore' },
    }
  } else {
    return { _id: 1 } //sort by id by default
  }
}

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, search } = req.query //paginated
    const movies = await Movie.find(
      search ? { $text: { $search: search } } : {}
    )
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(mapToSortQuery(sort, search))
      .exec()
    res.send(movies)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)
    res.send(movie)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.send(movie)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

//used to update details after creation
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const msg = await Movie.updateOne({ _id: id }, req.body)
  res.send(msg)
})

module.exports = router
