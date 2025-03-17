const express = require("express");
const router = express.Router();

const publicPath = require("path").join(__dirname, "../../public");

router.get("/login", (req, res) => {
  res.sendFile(publicPath + "/frontend/profile/login.html");
});
router.get("/account", (req, res) => {
  res.sendFile(publicPath + "/frontend/profile/account.html");
});

module.exports = router;
