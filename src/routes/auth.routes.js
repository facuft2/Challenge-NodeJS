const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/auth.controller');

router.post('/register', async ( {body}, res) => {
  try { 
    const { result, code } = await registerUser(body)

    console.log(result, code, 'result, code')
    switch (code) {
      case 201:
        return res.status(code).json({ user: result })
      case 400:
        return res.status(code).json({ error: result })
    }
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
)

module.exports = router;