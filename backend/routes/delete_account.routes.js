const express = require('express');
const router = express.Router();
const { deleteAccount } = require('../controllers/user.controller');

const publicPath = require('path').join(__dirname, '../../public');

router.post('/delete', (req, res) => {
    deleteAccount(req, res);
});

module.exports = router;