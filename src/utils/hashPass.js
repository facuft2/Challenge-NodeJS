const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPass = async password => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const pass = await bcrypt.hash(password, salt)
    return pass
  } catch (error) {
    console.log(error)
  }
}

module.exports = hashPass
