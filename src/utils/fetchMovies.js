const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const fetchMovies = async props => {
  const apiKey = process.env.API_TMDB_KEY
  const keyword = props.keyword ? props.keyword : ''

  if (!apiKey) {
    return { error: 'No API key found', code: 500 }
  }

  if (!keyword) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
    const movies = await axios.get(url)
    const moviesWithScore = movies.data.results.map(movie => {
      movie.suggestionScore = Math.floor(Math.random() * 100)
      return movie
    })
    return moviesWithScore
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`
  const movies = await axios.get(url)
  const moviesWithScore = movies.data.results.map(movie => {
    movie.suggestionScore = Math.floor(Math.random() * 100)
    return movie
  })
  return moviesWithScore
}

module.exports = fetchMovies
