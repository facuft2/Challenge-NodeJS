const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')

const auth = require('./src/routes/auth.routes')
const movies = require('./src/routes/movies.routes')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.use('/auth', auth)
app.use('/movies', movies)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(port, () => {
  console.log(`NodeJS API server is listening on port ${port}`)
})
