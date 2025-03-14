const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

const publicPath = require('path').join(__dirname, '../../public');


router.post('/getuser', async (req, res) => {
    const login = req.body.login;
    console.log(login);
    const user = await User.findOne({ login: login });
    if (!user) {
        return res.status(400).json({ message: 'Invalid login' });
    }
    else{
        res.status(200).json({
            login: user.login,
            email: user.email,
            role: user.role,
            displayName: user.displayName
            
        });
    }
});


module.exports = router;