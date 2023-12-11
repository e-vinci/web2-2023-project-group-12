const express = require('express');

const { updateUser } = require('../models/users');

const router = express.Router();

// PATCH update score win
router.patch('/:id', (req, res) => {
  const updatedUser = updateUser(req?.params?.id, req?.body);

  if (!updatedUser) return res.sendStatus(404);

  return res.json(updatedUser);
});

module.exports = router;
