const express = require('express');
const router = express.Router();
const { createQuestions } = require('../controllers/questions.controller');

router.post('/submit', createQuestions);

module.exports = router;