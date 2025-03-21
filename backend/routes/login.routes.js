const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const publicPath = require('path').join(__dirname, '../../public');

async function getUserPassword(login) {
    try {
        // Rechercher l'utilisateur par login ou email
        const user = await User.findOne({$or: [{ login: login }, { email: login }]}).select('+password');
        
        if (!user) {
            console.log("Utilisateur non trouvé !");
            return null;
        }
        return user.password;
    } catch (err) {
        console.error("Erreur lors de la récupération du mot de passe :", err);
        return null;
    }
}

async function checkPassword(entered_password, db_password) {
    try {
        const isMatch = await bcrypt.compare(entered_password, db_password);
        return isMatch;
    } catch (err) {
        console.error("Erreur lors de la comparaison des mots de passe :", err);
        return false;
    }
}


router.post('/', async (req, res)=>{
    console.log(req.body);
    if(!req.body.login || !req.body.password){
        return res.status(400).json({ message: 'All fields marked by * are required' });
    }
    const login = req.body.login;
    const entered_password = req.body.password;
    const db_password = await getUserPassword(login);
    if(!db_password){
        return res.status(400).json({ message: 'Invalid login' });
    }
    const isMatch = await checkPassword(entered_password, db_password);
    if(!isMatch){
        return res.status(400).json({ message: 'Invalid password' });
    }
    else{
        await User.updateOne({$or: [{ login: login }, { email: login }]}, { last_connected_on: Date.now() });
        req.session.login = login;
        console.log("User connected : ", login);
        res.status(200).json({ msg: 'Connected' });
    }
}
);


module.exports = router;