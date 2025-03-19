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
    const pswd = req.body.password;
    const isPasswordValid = await bcrypt.compare(pswd, user.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid password' });
    }
    await UserModel.deleteOne({login: req.body.login});
    res.status(200).json({ message: 'Account deleted' });
};

module.exports.editUser = async(req, res) => {
    const user = await UserModel.findOne({login: req.body.login});
    console.log(user);
    if(!user){
        return res.status(400).json({ message: 'User not found' });
    }

    const oldpswd = req.body.oldPassword;
    const isPasswordValid = await bcrypt.compare(oldpswd, user.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid password' });
    }
    const newpswd = req.body.newPassword;
    const newEmail = req.body.email;
    const newDisplayName = req.body.displayName;
    if(newpswd.length < 6){
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpswd, salt);
    

    //update the user in the database
    await UserModel.updateOne({login: req.body.login}, {password: hashedPassword, email: newEmail, displayName: newDisplayName});
    
    
    res.status(200).json({ message: 'Account updated' });

};