const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const apiKey = process.env.API_TMDB_KEY

const moviesById = async props => {
  try {
  const movieId = props.movieId ? props.movieId : ''
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  const movie = await axios.get(url).catch(error => { return { error: error.message, code: error.response.status }})
  return movie
  }
  catch (error) {
    throw new Error(error)
  }
}

const fetchMovies = async props => {
  const keyword = props.keyword ? props.keyword : ''
  if (!apiKey) {
    return { error: 'No API key found', code: 500 }
  }

  try {
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
} catch (error) {
  throw new Error(error) 

}
}

module.exports = {fetchMovies,moviesById}
