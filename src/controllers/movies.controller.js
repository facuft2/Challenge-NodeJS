const fetchMovies = require('../utils/fetchMovies')

const getMovies = async props => {
    try {
        const movies = await fetchMovies(props)
        if (movies.error) {
            return { error: movies.error, code: movies.code }
        }
        const moviesSorted = movies.sort((a, b) => b.suggestionScore - a.suggestionScore)
        return moviesSorted
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getMovies
}