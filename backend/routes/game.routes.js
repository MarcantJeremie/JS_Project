const express = require('express');
const router = express.Router();

const publicPath = require('path').join(__dirname, '../../public');

router.get('/start', (req, res) => {
  res.sendFile(publicPath+'/frontend/begin/begin.html');
});

router.get('/game', (req, res) => {
  res.sendFile(publicPath+'/frontend/game/game.html');
});


module.exports = router;