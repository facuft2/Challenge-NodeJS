const { fetchMovies, moviesById } = require('../utils/fetchMovies')
const { readFavorites, writeFavorites } = require('../db/db')

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


const addFavorite = async ({movieId, userId}) => {
    try {
        const idUser = userId
        const idMovie = movieId
        const date = new Date()
        const favorite = {
            idMovie,
            idUser,
            addedAt: date.toISOString()
        }

        const movie = await moviesById({ movieId })
        if (movie.code) {
            return { error: movie.error, code: movie.code }
        }
        if(!idMovie){
            return { error: 'Movie id is required', code: 400 }
        }
        const favorites = await readFavorites()
        const favoriteExists = favorites.find(fav => fav.idMovie === idMovie && fav.idUser === idUser)
        if (favoriteExists) {
            return { error: 'Movie already in favorites', code: 400 }
        }
        favorites.push(favorite)
        await writeFavorites(favorites)
        return { favorite , message: 'Movie added to favorites', code: 201}
    }
    catch (error) {
        throw new Error(error)
    }
}

const getFavorites = async ({ idUser }) => {
    try {
        const favorites = await readFavorites()
        const favoritesByUser = favorites.filter(fav => fav.idUser === idUser)
        if (favoritesByUser.length === 0) {
            return { error: 'User has no favorites', code: 400 }
        }
        const movies = []
        for (const fav of favoritesByUser) {
            const movie = await moviesById({ movieId: fav.idMovie })
            movie.data.suggestionForTodayScore = Math.floor(Math.random() * 100)
            movies.push(movie.data)
        }

        const moviesSorted = movies.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore)

        return moviesSorted
    }
    catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getMovies,
    addFavorite,
    getFavorites,
}