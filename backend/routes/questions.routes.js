const express = require("express");
const router = express.Router();
const {
  createQuestions,
  getAllNoVerifiedQuestions,
  approvedQuestions,
  removeQuestion,
} = require("../controllers/questions.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/files/uploads/non-verified",
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

const publicPath = require("path").join(__dirname, "../../public");

router.post("/submit", upload.single("file"), createQuestions);
router.post("/getNoVerifiedQuestions", getAllNoVerifiedQuestions);
router.put("/approvedQuestion", approvedQuestions);
router.delete("/removeQuestion", removeQuestion);

router.get("/create", (req, res) => {
  res.sendFile(publicPath + "/frontend/create_question/create_question.html");
});
router.get("/confirm", (req, res) => {
  res.sendFile(publicPath + "/frontend/confirm_question/confirm_question.html");
});

module.exports = router;
