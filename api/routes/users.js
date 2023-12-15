const express = require('express');

const { updateUser, readOneUserFromUsername } = require('../models/users');

const router = express.Router();

// Read a user from its username
router.get('/:username', (req, res) => {
  const foundUser = readOneUserFromUsername(req?.params?.username);
  if (!foundUser) return res.sendStatus(404);

  const user = {
    username: foundUser.username,
    gamesWon: foundUser.gamesWon,
    gamesLost: foundUser.gamesLost,
    gamesPlayed: foundUser.gamesPlayed,
  };

  console.log(user);

  return res.json(user);
});

// PATCH update score win
router.patch('/:id', (req, res) => {
  const updatedUser = updateUser(req?.params?.id, req?.body);

  if (!updatedUser) return res.sendStatus(404);

  return res.json(updatedUser);
});

module.exports = router;
