const { Router } = require('express')
const Movie = require('../models/movie')

const router = Router()

function mapToSortQuery(sort, search) {
  sort = sort.toLowerCase()
  if (sort == 'recent') {
    return { release_date: -1 }
  } else if (sort == 'popular') {
    return { rating_total: -1 }
  } else if (sort == 'best') {
    return { votes: -1 }
  } else if (sort == 'top rated') {
    return { rating_avg: -1 }
  } else if (sort == 'trending') {
    return { trend_score: -1 }
  } else if (search) {
    //sort by relevance
    return {
      score: { $meta: 'textScore' },
    }
  }
  // } else {
  //   return { _id: 1 } //sort by id by default
  // }
}

function mapToSearchQuery(search, sort) {
  if (!sort) {
    return {
      text: {
        query: search,
        path: 'title',
        fuzzy: { maxEdits: 2 },
      },
    }
  } else {
    const mappings = {
      recent: 'release_date',
      popular: 'rating_total',
      best: 'votes',
      'top rated': 'rating_avg',
      trending: 'trend_score',
    }
    return {
      //boost score based on sort
      text: {
        query: search,
        path: 'title',
        fuzzy: { maxEdits: 1 },
        score: {
          boost: {
            path: mappings[sort.toLowerCase()],
          },
        },
      },
    }
  }
}

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, search, genres } = req.query //paginated
    //use atlas search
    if (search && process.env.NODE_ENV === 'production') {
      let pipeline = Movie.aggregate()
        .search(mapToSearchQuery(search, sort))
        .match(genres ? { genres: { $all: genres.split('|') } } : {})
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
      const movies = await pipeline
      res.send(movies)
    } else {
      //use simple text search
      const movies = await Movie.find(
        search ? { $text: { $search: search } } : {}
      )
        .find(genres ? { genres: { $all: genres.split('|') } } : {})
        .limit(limit)
        .skip((page - 1) * limit)
        .sort(mapToSortQuery(sort, search))
        .exec()
      res.send(movies)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get('/promoted', async (_, res) => {
  try {
    const movies = await Movie.find({
      _id: {
        $in: [1, 2, 3],
      },
    })
    res.send(movies)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)
    res.send(movie)
  } catch (err) {
    res.status(500).send(err)
  }
})

//only allow in development
if (!process.env.RENDER) {
  console.log('Modifications allowed')
  router.post('/', async (req, res) => {
    try {
      const movie = await Movie.create(req.body)
      res.send(movie)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

  //used to update details after creation
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const msg = await Movie.updateOne({ _id: id }, req.body)
      res.send(msg)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })
}

module.exports = router
