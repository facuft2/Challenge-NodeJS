const fs = require('fs');
const users = './src/db/users.json';
const movies = './src/db/movies.json';

function readUsers() {
  const data = fs.readFileSync(users);
  return JSON.parse(data);
}

function readMovies() {
  const data = fs.readFileSync(movies);
  return JSON.parse(data);
}

function writeUsers(data) {
  fs.writeFileSync(users, JSON.stringify(data, null, 2));
}

function writeFavoritesMovies(data) {
  fs.writeFileSync(movies, JSON.stringify(data, null, 2));
}

module.exports = {
    readUsers,
    readMovies,
    writeUsers,
    writeFavoritesMovies,
};
