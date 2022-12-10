const axios = require('axios')
const LineByLineReader = require('line-by-line')

//Populate mongodb database with TMDB data
const URL = 'http://localhost:3001/movies'

//File streams
let lr = new LineByLineReader('data/movieDetails.txt')

//Limit number of concurrent requests
let count = 0
let onGoing = 0
let maxOnGoing = 5
lr.on('line', async (line) => {
  count++
  if (count % 1000 == 0) {
    console.log(count)
  }
  //pause
  onGoing++
  if (onGoing > maxOnGoing) {
    lr.pause()
  }
  //put request
  line = JSON.parse(line)
  const response = JSON.parse(line.response)
  const { overview, backdrop_path, poster_path, release_date } = response
  const movie = {
    overview,
    poster_path,
    backdrop_path,
    release_date,
  }
  const res = await axios.put(`${URL}/${line.movie_idx}`, movie)
  //resume
  onGoing--
  if (onGoing == maxOnGoing) {
    lr.resume()
  }
})

lr.on('end', () => {
  console.log(count)
})
