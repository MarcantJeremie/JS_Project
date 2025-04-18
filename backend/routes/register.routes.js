const express = require('express');
const router = express.Router();
const { setUsers } = require('../controllers/user.controller');

const publicPath = require('path').join(__dirname, '../../public');

router.post('/', setUsers);



module.exports = router;