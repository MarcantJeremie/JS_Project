const express = require("express");
const router = express.Router();
const { updateConnection } = require("../controllers/user.controller");
const publicPath = require("path").join(__dirname, "../../public");

router.all("*", async (req, res, next) => {
  try{
    if(req.session.login){
        login = req.session.login;  
        await updateConnection(login);
        next();
    }
    else{
        next();
    }
    }catch(err){
        console.error("Erreur lors de la récupération du mot de passe :", err);
        next();
    }
});

module.exports = router;
