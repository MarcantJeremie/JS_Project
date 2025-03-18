const express = require('express');
const router = express.Router();
const { createQuestions } = require('../controllers/questions.controller');

const publicPath = require('path').join(__dirname, '../../public');


router.post('/submit', createQuestions);

router.get('/create', (req, res) => {
    res.sendFile(publicPath + '/frontend/create_question/create_question.html');
});

module.exports = router;