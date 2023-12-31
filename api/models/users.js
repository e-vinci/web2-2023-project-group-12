const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'spacelover!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

function validUsername(username) {
  if (!username || typeof username !== 'string') throw new Error('Invalid username');
}

function validPassword(password) {
  if (!password || typeof password !== 'string') throw new Error('Invalid password');
}

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { userFound }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const user = {
    id: userFound.id,
    username: userFound.username,
    gamesWon: userFound.gamesWon,
    gamesLost: userFound.gamesLost,
    gamesPlayed: userFound.gamesPlayed,
  };

  const authenticatedUser = {
    user,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  return createOneUser(username, password);
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function createOneUser(username, password) {
  validUsername(username);
  validPassword(password);
  const users = parse(jsonDbPath);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function updateUser(id, propertiesToUpdate) {
  const userId = Number(id);
  const users = parse(jsonDbPath);
  const foundIndex = users.findIndex((user) => user.id === userId);
  if (foundIndex < 0) return undefined;

  const updatedUser = { ...users[foundIndex], ...propertiesToUpdate };

  users[foundIndex] = updatedUser;

  const user = {
    id: updatedUser.id,
    username: updatedUser.username,
    gamesPlayed: updatedUser.gamesPlayed,
    gamesLost: updatedUser.gamesLost,
    gamesWon: updatedUser.gamesWon,
  };

  serialize(jsonDbPath, users);

  return user;
}

function readAllRanking() {
  const players = parse(jsonDbPath);
  const users = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < players.length; i++) {
    const player = {
      id: players[i].id,
      username: players[i].username,
      gamesWon: players[i].gamesWon,
    };

    users.push(player);
  }

  const ranking = [...users].sort((a, b) => b.gamesWon - a.gamesWon);

  return ranking;
}

function getNextId() {
  const users = parse(jsonDbPath);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  readAllRanking,
  updateUser,
};
