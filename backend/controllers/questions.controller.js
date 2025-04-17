const QuestionModel = require("../models/questions.model");

module.exports.createQuestions = async (req, res) => {
    
    console.log(req.body);
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

    tags = req.body.tags.split(",");
    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
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
      question: req.body.answer,
      answer: req.body.answer,
      tags: req.body.tags,
      difficulty: req.body.difficulty,
      verified: true,
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
