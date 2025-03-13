const express = require('express');
const router = express.Router();

const publicPath = require('path').join(__dirname, '../../public');

function addPage(path_html, access){
    new_path = publicPath + "/frontend/" + path_html;
    router.get("/" + access, (req, res) => {
        res.sendFile(new_path);
    });
}

//You can add a new page by using addPage function
//Your file must be located in public/frontend/.....
//Exemple : 
//File to show : public/frontend/game/game.html
//URL to show : /game/current
//Code to write : addPage("game/game.html", "game/current");

//Vous pouvez ajouter une nouvelle page en utilisant la fonction addPage
//Le fichier à afficher DOIT être situé dans public/frontend/.....
//Exemple
//File à afficher : public/frontend/game/game.html
//URL où l'on souhaite l'afficher : /game/current
//Code à écrire : addPage("game/game.html", "game/current");

//Dont edit above this line / Ne pas modifier au dessus de cette ligne






//Dont edit below this line / Ne pas modifier en dessous de cette ligne

module.exports = router;