const QuestionModel = require('../models/questions.model');


module.exports.createQuestions = async(req, res) => {
    
    console.log(req.body);
    if (!req.body.question || !req.body.answer || !req.body.tags || !req.body.difficulty) {
        return res.status(400).json({ message: 'All fields marked by * are required' });
    }
    if(!req.body.verified){
        req.body.verified = false;
    }
    if (!req.file) {
        return res.status(400).json({message: "Aucun fichier reçu"});
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
        created_by: req.session.login
    });
    res.status(201).json(question);

};