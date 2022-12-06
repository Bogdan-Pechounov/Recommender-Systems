const axios = require('axios')
const fs = require('fs')
const csv = require('csv-parser')

//Populate mongodb database with MovieLens data
const URL = 'http://localhost:3001/movies'

//File Streams
const path = '../data/full/movies.csv'
let readStream = fs.createReadStream(path, { encoding: 'utf-8' })
let csvStream = csv()

//Read line by line
let count = 0
let onGoing = 0
let maxOnGoing = 5
readStream.pipe(csvStream).on('data', async (row) => {
  count++
  //pause
  onGoing++
  if (!csvStream.isPaused() && onGoing >= maxOnGoing) {
    csvStream.pause()
  }
  //post request
  const { movieId, title } = row
  const genres = row.genres.split('|')
  const movie = { movieId, title, genres }
  const res = await axios.post(URL, movie)
  //resume
  onGoing--
  if (csvStream.isPaused() && onGoing < maxOnGoing) {
    csvStream.resume()
  }
  if (count % 1000 == 0) {
    console.log(count)
  }
})
