const express = require('express');

const { readOneUserFromUsername } = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

// PATCH update score win
router.patch('/:username', (req, res) => {
  const user = req.params.username;
  //  const gamesPlayed = req?.body?.gamesPlayedUpdate;
  //  const gamesWon = req?.body?.gamesWonUpdate;
  const player = readOneUserFromUsername(user);

  const updatePlayer = { ...player, ...req.body };

  return res.json(updatePlayer);
  // faur faire un if en fonction si il y a un games won ou pas donc =>>> des conditions!!
});

module.exports = router;
