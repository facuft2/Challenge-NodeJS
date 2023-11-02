const db = require('../db/db.js')
const hashPass = require('../utils/hashPass.js')

const registerUser = async (props) => {
  try {
    const { email, firstName, lastName, password } = props
    const users = await db.readUsers()
    const userExists = users.find(user => user.email === email)
    const id = userExists ? userExists.id : users.length > 0 ? users[users.length - 1].id + 1 : 1
    if (userExists) {
      return { result: 'User already exists', code: 400 }
    } else {
      const hashedPass = await hashPass(password)
      const newUser = { id, email, firstName, lastName, password: hashedPass }
      users.push(newUser)
      db.writeUsers(users)
      return { result: { id: newUser.id, email: newUser.email, firstName: newUser.firstName }, code: 201 }
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  registerUser
}
