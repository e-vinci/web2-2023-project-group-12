const express = require('express');
const { register, login, readAllRanking } = require('../models/users');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.trim() ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) throw new Error('empty username or password');

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) throw new Error('username already taken');

  createCookieSessionData(req, authenticatedUser);
  return res.json({ username: authenticatedUser.username });
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) throw new Error('empty username or password');

  const authenticatedUser = await login(username, password);
  console.log(authenticatedUser.username);

  if (!authenticatedUser) throw new Error('invalid username or password');

  createCookieSessionData(req, authenticatedUser);
  return res.json({ username: authenticatedUser.username });
});

/* Login second user */
router.post('/loginSecondPlayer', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser2 = await login(username, password);
  console.log(authenticatedUser2.username);

  if (!authenticatedUser2) return res.sendStatus(401); // 401 Unauthorized

  createCookieSessionData2(req, authenticatedUser2);
  console.log(req.session.username);

  return res.json({ username: authenticatedUser2.username });
});

/* Logout a user */

router.get('/logout', (req, res) => {
  req.session = null;

  return res.sendStatus();
});

// rank page
router.get('/rank', (req, res) => {
  const ranking = readAllRanking();
  console.log(ranking[1].username);

  return res.json(ranking);
});

function createCookieSessionData(req, authenticatedUser) {
  req.session.username = authenticatedUser.username;
  req.session.token = authenticatedUser.token;
}

function createCookieSessionData2(req, authenticatedUser2) {
  req.session.username2 = authenticatedUser2.username;
  req.session.token2 = authenticatedUser2.token;
}

module.exports = router;
