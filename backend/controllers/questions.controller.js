const QuestionModel = require("../models/questions.model");
const fs = require("fs");
const path = require("path");


module.exports.createQuestions = async (req, res) => {
    const deleteFileIfExists = (filename = "files/uploads/non-verified/" + req.file.filename) => {
        if (req.file) {
            const filePath = "public/" + filename;
          fs.unlink(filePath, (err) => {
            if (err) console.error("Erreur lors de la suppression du fichier :", err);
            else console.log("Fichier supprimé :", filename);
          });
        }
      };


    console.log(req.body);
  if (
    !req.body.question ||
    !req.body.answer ||
    !req.body.tags ||
    !req.body.difficulty
  ) {
    deleteFileIfExists();
    return res
      .status(400)
      .json({ message: "All fields marked by * are required" });
  }
  if (!req.body.verified) {
    req.body.verified = false;
  }
  if (!req.file) {
    deleteFileIfExists();
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }
  const filePath = "files/uploads/non-verified/" + req.file.filename;

    tags = req.body.tags.split(",");
    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
    }
    if(!req.session.login) {
        deleteFileIfExists();
        return res.status(400).json({ message: "You need to be logged in" });
    }
  const question = await QuestionModel.create({
    question: req.body.question,
    answer: req.body.answer,
    tags: tags,
    difficulty: req.body.difficulty,
    verified: req.body.verified,
    img_path: filePath,
    created_by: req.session.login,
  });
  res.status(201).json(question);
};

module.exports.getQuestionById = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Id's question is needed" });
  }

  const question = await QuestionModel.findOne({ _id: req.body.id });
  if (!question) {
    return res.status(400).json({ message: "Question doesn't exist" });
  }

  res.status(201).json(question);
};

module.exports.getAllNoVerifiedQuestions = async (req, res) => {
  const result = await QuestionModel.find({ verified: false });

  res.status(201).json(result);
};

module.exports.approvedQuestions = async (req, res) => {
  if (
    !req.body.id ||
    !req.body.id_user ||
    !req.body.question ||
    !req.body.answer ||
    !req.body.tags ||
    !req.body.difficulty
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const question = await QuestionModel.findOne({
    _id: req.body.id,
  });
  if (!question) {
    return res
      .status(400)
      .json({ message: "The question you want to approve doesn't exist" });
  }

  await QuestionModel.updateOne(
    { _id: req.body.id },
    {
      question: req.body.question,
      answer: req.body.answer,
      tags: req.body.tags,
      difficulty: req.body.difficulty,
      verified: true,
      verified_by: req.body.id_user,
      verified_on: Date.now(),
    }
  );
  return res.status(201).json({message:"Question approved"});
};

module.exports.removeQuestion = async (req, res) => {
    const deleteFileIfExists = (filename) => {
        if (filename) {
            const filePath = "public/" + filename;
          fs.unlink(filePath, (err) => {
            if (err) console.error("Erreur lors de la suppression du fichier :", err);
            else console.log("Fichier supprimé :", filename);
          });
        }
      };
    if (!req.body.id) {
    return res.status(400).json({ message: "Id's question is needed" });
  }

  const existingQuestion = await QuestionModel.findOne({ _id: req.body.id });
  if (!existingQuestion) {
    return res
      .status(400)
      .json({ message: "The question you want to approve doesn't exist" });
  }
  const filePath = existingQuestion.img_path;
  await QuestionModel.deleteOne({ _id: req.body.id });
  deleteFileIfExists(filePath);
  res.status(201).json({message:"Question deleted"});
};


module.exports.getTags = async (req, res) => {
    const questions = await QuestionModel.find({ verified: true });
    var tags = [];
    questions.forEach((question) => {
        question.tags.forEach((tag) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
    });
    res.status(201).json({tags: tags});
};