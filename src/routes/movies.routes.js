const express = require('express');
const router = express.Router();
const { getMovies } = require('../controllers/movies.controller');
const { verifyToken } = require('../middlewares/auth.middleware');	

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

// router.post('/favorite', moviesController.addFavorite)
// router.get('/favorite', moviesController.getFavorites)

module.exports = router;