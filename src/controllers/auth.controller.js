const db = require('../db/db.js')
const hashPass = require('../utils/hashPass.js')
const bcrypt = require('bcrypt')
const { generateToken } = require('../middlewares/auth.middleware')

const registerUser = async props => {
  try {
    const { email, firstName, lastName, password } = props
    const users = await db.readUsers()
    const userExists = users.find(user => user.email === email)

    const id = userExists
      ? userExists.id
      : users.length > 0
      ? users[users.length - 1].id + 1
      : 1

    if (userExists) {
      return { result: 'User already exists', code: 400 }
    } else {
      const hashedPass = await hashPass(password)
      const newUser = { id, email, firstName, lastName, password: hashedPass }
      users.push(newUser)
      db.writeUsers(users)
      return {
        result: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
        },
        code: 201,
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const loginUser = async props => {
  try {
    const { email, password } = props
    const users = await db.readUsers()
    const userExists = users.find(user => user.email === email)
    const hashedPass = userExists.password
    const match = await bcrypt.compare(password, hashedPass)
    if (match) {
      const token = generateToken(userExists)
      return {
        result: {
          user: {
            id: userExists.id,
            email: userExists.email,
            firstName: userExists.firstName,
          },
          token,
        },
        code: 200,
      }
    } else {
      return { result: 'Invalid password', code: 400 }
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  registerUser,
  loginUser,
}
