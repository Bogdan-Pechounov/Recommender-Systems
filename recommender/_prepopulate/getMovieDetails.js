const fs = require("fs")
const csv = require("csv-parser")
const axios = require("axios")
require("dotenv").config()

//File Streams
let in_path = "../data/full/links.csv"
let out_path = "data/movies.txt"

let readStream = fs.createReadStream(in_path, { encoding: "utf-8" })
let writeStream = fs.createWriteStream(out_path)

//TMDB API
const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.TMDB_API_KEY

async function getMovie(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  return JSON.stringify(response.data)
}

//Write movie details in JSON format
let countTotal = 0
let countIgnored = 0
let csvStream = csv()
let batchSize = 100
let waiting = 0
readStream.pipe(csvStream).on("data", async (row) => {
  countTotal++
  //Avoid socket disconnect
  waiting++
  if (waiting > batchSize) {
    csvStream.pause()
  }
  // some movies don't have a tmdb id
  if (row.tmdbId) {
    //Save the entire api response and filter later
    try {
      row.response = await getMovie(row.tmdbId)
      writeStream.write(JSON.stringify(row) + "\n")
    } catch (err) {
      console.log(err.message, row)
    }
  } else {
    countIgnored++
  }
  //Resume
  waiting--
  if (waiting == 0) {
    csvStream.resume()
    console.log("Resuming", countTotal)
  }
})

readStream.on("end", () => {
  console.log(`${countTotal} movies, ${countIgnored} ignored`)
})
