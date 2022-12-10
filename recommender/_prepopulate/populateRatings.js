const axios = require('axios')
const fs = require('fs')
const csv = require('csv-parser')

//Populate mongodb database with MovieLens data
const URL = 'http://localhost:3001/ratings'

//File Streams
const path = '../data/full/ratings_edited.csv'
let readStream = fs.createReadStream(path, { encoding: 'utf-8' })
let csvStream = csv()

//Read line by line
let count = 0
let onGoing = 0
let maxOnGoing = 5
readStream.pipe(csvStream).on('data', async (row) => {
  count++
  if (count % 10000 == 0) {
    console.log(count)
  }
  //pause
  if (!csvStream.isPaused() && onGoing >= maxOnGoing) {
    csvStream.pause()
  }
  //post request
  const { userId, movie_idx: movieId, rating, timestamp } = row
  onGoing++
  await axios.post(URL, { userId, movieId, rating, timestamp })
  onGoing--
  //resume
  if (csvStream.isPaused() && onGoing < maxOnGoing) {
    csvStream.resume()
  }
})
