const express = require("express");
const router = express.Router();

const publicPath = require("path").join(__dirname, "../../public");

router.get("/profil", (req, res) => {
  res.sendFile(publicPath + "/frontend/profil/profil.html");
});

module.exports = router;
