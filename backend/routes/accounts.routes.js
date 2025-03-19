const express = require('express');
const router = express.Router();
const { deleteAccount, editUser } = require('../controllers/user.controller');

const publicPath = require('path').join(__dirname, '../../public');

router.post('/delete', (req, res) => {
    deleteAccount(req, res);
});

router.post('/edit', (req, res) => {
    editUser(req, res);
});

module.exports = router;