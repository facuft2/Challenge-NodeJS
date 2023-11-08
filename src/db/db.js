const fs = require('fs')
const users = './src/db/users.json'
const movies = './src/db/movies.json'
const express = require('express')

if (!fs.existsSync(users)) {
  fs.writeFileSync(users, '[]')
}

if (!fs.existsSync(movies)) {
  fs.writeFileSync(movies, '[]')
}

function readUsers() {
  const data = fs.readFileSync(users)
  return JSON.parse(data)
}

function readFavorites() {
  const data = fs.readFileSync(movies)
  return JSON.parse(data)
}

function writeUsers(data) {
  fs.writeFileSync(users, JSON.stringify(data, null, 2))
}

function writeFavorites(data) {
  fs.writeFileSync(movies, JSON.stringify(data, null, 2))
}

module.exports = {
  readUsers,
  readFavorites,
  writeUsers,
  writeFavorites,
}
