const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Start server and database connection
const app = express()

const PORT = 3001
const DB_URI = 'mongodb://127.0.0.1:27017/movies'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
  console.log(process.env.RENDER)
  console.log(process.env)
})
app.get('/', (_, res) => res.send('Hello there!'))

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to database:', DB_URI)
  })
  .catch((err) => {
    console.log("Can't connect to database")
    console.log(err)
  })

//Middleware
//TODO exclude POST PUT in production
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

//Routes
app.use('/movies', require('./routes/movies'))
app.use('/ratings', require('./routes/ratings'))
