const express = require('express');
const { register, login } = require('../models/users');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Request

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) return res.sendStatus(409); // 409 Conflict

  createCookieSessionData(req, authenticatedUser);

  return res.json({ username: authenticatedUser.username });
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  createCookieSessionData(req, authenticatedUser);

  return res.json({ username: authenticatedUser.username });
});

/* Logout a user */

router.get('/logout', (req, res) => {
  req.session = null;

  return res.sendStatus();
});

function createCookieSessionData(req, authenticatedUser) {
  req.session.username = authenticatedUser.username;

  req.session.token = authenticatedUser.token;
}

module.exports = router;
