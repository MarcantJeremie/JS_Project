const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.setUsers = async(req, res) => {
    if (!req.body.login || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'All fields marked by * are required' });
    }
    let role = req.body.role;
    let displayName = req.body.displayName;
    if(!role){
        role = 'user';
    }
    if(!displayName){
        displayName = req.body.login;
    }
    const userpswd = req.body.password;
    if(userpswd.length < 6){
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpswd, salt);

    const user = await UserModel.create({
        login: req.body.login,
        password: hashedPassword,
        email: req.body.email,
        role: role,
        displayName: displayName
    });
    res.status(201).json(user);
}

module.exports.deleteAccount = async(req, res) => {
    const user = await UserModel.findOne({login: req.body.login});
    if(!user){
        return res.status(400).json({ message: 'User not found' });
    }
    await UserModel.deleteOne({login: req.body.login});
    res.status(200).json({ message: 'Account deleted' });
};