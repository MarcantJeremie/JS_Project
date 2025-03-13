const express = require('express');
const router = express.Router();

const publicPath = require('path').join(__dirname, '../../public');

router.get('/', (req, res) => {
  res.sendFile(publicPath+'/frontend/index/index.html');
});

module.exports = router;