const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Start server and database connection
const app = express()

const PORT = process.env.PORT || 3001
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/movies'
const origin = process.env.ORIGIN || 'http://localhost:3000'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
app.get('/', (_, res) => res.send('Hello there!'))

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to database:', DB_URI)
  })
  .catch((err) => {
    console.log("Can't connect to database:", DB_URI)
    console.log(err)
  })

//Middleware
app.use(express.json())
app.use(cors({ origin }))

//Routes
app.use('/movies', require('./routes/movies'))
app.use('/ratings', require('./routes/ratings'))
app.get('/test/:id', (req, res) => {
  res.send(req.params)
})
