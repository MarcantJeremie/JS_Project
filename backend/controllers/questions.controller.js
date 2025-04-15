const QuestionModel = require("../models/questions.model");

module.exports.createQuestions = async (req, res) => {
  if (
    !req.body.question ||
    !req.body.answer ||
    !req.body.tags ||
    !req.body.difficulty
  ) {
    return res
      .status(400)
      .json({ message: "All fields marked by * are required" });
  }
  if (!req.body.verified) {
    req.body.verified = false;
  }
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }
  const filePath = "files/uploads/non-verified/" + req.file.filename;

  const question = await QuestionModel.create({
    question: req.body.question,
    answer: req.body.answer,
    tags: req.body.tags,
    difficulty: req.body.difficulty,
    verified: req.body.verified,
    img_path: filePath,
    created_by: req.session.login,
  });
  res.status(201).json(question);
};

module.exports.getAllNoVerifiedQuestions = async (req, res) => {
  const questions = await QuestionModel.find();

  res.status(201).json(questions);
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

  // Si la question a été modifié
  if (question.question !== req.body.question) {
    // On vérifie si la nouvelle question n'est pas déjà dans la db
    const existingQuestion = await QuestionModel.findOne({
      question: req.body.question,
    });
    if (existingQuestion) {
      return res
        .status(400)
        .json({ message: "The question you want to ask is already in use" });
    }
  }

  await QuestionModel.updateOne(
    { _id: req.body.id },
    {
      question: req.body.answer,
      answer: req.body.answer,
      tags: req.body.tags,
      difficulty: req.body.difficulty,
      verified_by: req.body.id_user,
      verified_on: Date.now(),
    }
  );
  res.status(201).json("Question approved");
};

module.exports.removeQuestion = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Id's question is needed" });
  }

  const existingQuestion = await QuestionModel.findOne({ _id: req.body.id });
  if (!existingQuestion) {
    return res
      .status(400)
      .json({ message: "The question you want to approve doesn't exist" });
  }

  await QuestionModel.deleteOne({ _id: req.body.id });
  res.status(201).json("Question deleted");
};
