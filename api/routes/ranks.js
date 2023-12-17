const express = require('express');

const { readAllRanking } = require('../models/users');

const router = express.Router();

// rank page
router.get('/', (req, res) => {
  const ranking = readAllRanking();

  return res.json(ranking);
});

module.exports = router;
