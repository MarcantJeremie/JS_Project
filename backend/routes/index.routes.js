const express = require('express');
const router = express.Router();

const rootPath = require('path').join(__dirname, '../../');

router.get('/', (req, res) => {
  res.sendFile(rootPath + '/frontend/index/index.html');
});

module.exports = router;