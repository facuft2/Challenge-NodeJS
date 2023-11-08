const jwt = require('jsonwebtoken')
const { readUsers } = require('../db/db')

const loginCheck = (req, res, next) => {
  try {
    const { email, password } = req.body
    const users = readUsers()

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters' })
    }

    const userExists = users.find(user => user.email === email)
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' })
    }

    req.user = userExists
    next()
  } catch (error) {
    throw new Error(error)
  }
}

const generateToken = user => {
  const { id, email, firstName } = user
  const token = jwt.sign({ id, email, firstName }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  })
  return token
}

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' })
  }

  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}


module.exports = {
  loginCheck,
  generateToken,
  verifyToken,
}
