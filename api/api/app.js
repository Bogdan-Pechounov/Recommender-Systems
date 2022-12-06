const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Start server and database connection
const app = express()

const PORT = 3001
const DB_URI = 'mongodb://127.0.0.1:27017/movies'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

mongoose.connect(DB_URI).then(() => {
  console.log('Connected to database:', DB_URI)
})

//Middleware
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

//Routes
app.use('/movies', require('./routes/movies'))
