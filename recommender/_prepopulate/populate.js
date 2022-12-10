const axios = require('axios')
const fs = require('fs')
const csv = require('csv-parser')

//Populate mongodb database with MovieLens data
const URL = 'http://localhost:3001/movies'

//File Streams
const path = '../data/full/movies_edited.csv'
let readStream = fs.createReadStream(path, { encoding: 'utf-8' })
let csvStream = csv()

//Read line by line
let count = 0
let onGoing = 0
let maxOnGoing = 5
readStream.pipe(csvStream).on('data', async (row) => {
  count++
  if (count % 1000 == 0) {
    console.log(count)
  }
  //pause
  if (!csvStream.isPaused() && onGoing >= maxOnGoing) {
    csvStream.pause()
  }
  //post request
  const { movie_idx, title, genres } = row
  //not all movies have ratings
  if (movie_idx) {
    onGoing++
    const movie = { _id: movie_idx, title, genres: genres.split('|') }
    try {
      const res = await axios.post(URL, movie)
    } catch (err) {
      console.log(err.message)
    }
    onGoing--
  }
  //resume
  if (csvStream.isPaused() && onGoing < maxOnGoing) {
    csvStream.resume()
  }
})
