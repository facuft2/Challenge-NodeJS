const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/auth.controller')
const { loginCheck } = require('../middlewares/auth.middleware')
const validateInput = require('../middlewares/inputValidator')
const registerSchema = require('./validators/registerSchema')

router.post(
  '/register',
  validateInput(registerSchema),
  async ({ body }, res) => {
    try {
      const { result, code } = await registerUser(body)

      switch (code) {
        case 201:
          return res.status(code).json({ result: result })
        case 400:
          return res.status(code).json({ error: result })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

router.post('/login', loginCheck, async (req, res) => {
  try {
    const { email, password } = req.body
    const { result, code } = await loginUser({ email, password })
    switch (code) {
      case 200:
        return res
          .status(code)
          .header('Authorization', `Bearer ${result.token}`)
          .json({ message: 'Login successful', user: result.user })
      case 400:
        return res.status(code).json({ error: result })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
