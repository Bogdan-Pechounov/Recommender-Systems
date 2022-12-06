const axios = require('axios')
const LineByLineReader = require('line-by-line')
const fs = require('fs')

//Populate mongodb database with TMDB data
const URL = 'http://localhost:3001/movies'

//File streams
let lr = new LineByLineReader('data/movies.txt')

//Limit number of concurrent requests
let count = 0
let onGoing = 0
let maxOnGoing = 5
lr.on('line', async (line) => {
  count++
  //pause
  onGoing++
  if (onGoing > maxOnGoing) {
    lr.pause()
  }
  line = JSON.parse(line)
  const response = JSON.parse(line.response)
  const { overview, backdrop_path, poster_path, release_date } = response
  const movie = {
    movieId: line.movieId,
    overview,
    poster_path,
    backdrop_path,
    release_date,
  }
  const res = await axios.put(URL, movie)
  //resume
  onGoing--
  if (onGoing == maxOnGoing) {
    lr.resume()
  }
  if (count % 1000 == 0) {
    console.log(count)
  }
})
