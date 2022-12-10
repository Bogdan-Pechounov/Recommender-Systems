const fs = require('fs')
const csv = require('csv-parser')
const axios = require('axios')
require('dotenv').config()

//File Streams
let in_path = '../data/full/links_edited.csv'
let out_path = 'data/movieDetails.txt'

let readStream = fs.createReadStream(in_path, { encoding: 'utf-8' })
let writeStream = fs.createWriteStream(out_path)

//TMDB API
const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

async function getMovie(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  return JSON.stringify(response.data)
}

async function getTv(id) {
  const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
  return JSON.stringify(response.data)
}

//Write movie details in JSON format
let countTotal = 0
let countIgnored = 0
let csvStream = csv()
let batchSize = 100
let waiting = 0
readStream.pipe(csvStream).on('data', async (row) => {
  countTotal++
  if (countTotal % 1000 == 0) {
    console.log(countTotal)
  }
  //Avoid socket disconnect
  waiting++
  if (waiting > batchSize) {
    csvStream.pause()
  }
  // some movies don't have a tmdb id
  if (row.movie_idx) {
    //Save the entire api response and filter later
    try {
      row.response = await getMovie(row.tmdbId)
      writeStream.write(JSON.stringify(row) + '\n')
    } catch (err) {
      //might be a tv series
      try {
        row.response = await getTv(row.tmdbId)
        writeStream.write(JSON.stringify(row) + '\n')
        console.log('MOVIE', err.message, row)
      } catch (err) {
        console.log('TV', err.message, row)
      }
    }
  } else {
    countIgnored++
  }
  //Resume
  waiting--
  if (waiting == 0) {
    csvStream.resume()
  }
})

readStream.on('end', () => {
  console.log(`${countTotal} movies, ${countIgnored} ignored`)
})
