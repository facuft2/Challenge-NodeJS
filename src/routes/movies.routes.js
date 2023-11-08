const express = require('express')
const router = express.Router()
const { getMovies, addFavorite } = require('../controllers/movies.controller')
const { verifyToken } = require('../middlewares/auth.middleware')

router.get('/', verifyToken, async (req, res) => {
  const { keyword } = req.query
  try {
    const movies = await getMovies({ keyword })
    if (movies.error) {
      return res.status(movies.code).json({ error: movies.error })
    }
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/favorite', verifyToken, async (req, res) => {
  const { movieId } = req.body
  const userId = req.user.id
    try {
        const favorites = await addFavorite({ movieId, userId })
        if (favorites.error) {
            return res.status(favorites.code).json({ error: favorites.error })
        }
        res.status(favorites.code).json({result: favorites})
        } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
)

// router.get('/favorite', moviesController.getFavorites)

module.exports = router
