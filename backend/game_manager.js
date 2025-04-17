const Questions = require('./models/questions.model.js');


/**
* is an array containing all parameters needed to search for questions
* 0: number of total questions
* 1: tags (an array too)
* 2: number of requested question for difficulty 1
* 3: number of requested question for difficulty 2
* 4: number of requested question for difficulty 3
* 5: number of requested question for difficulty 4
* 6: timer duration
*/
const searchForQuestions = async (params) => {
    const totalQuestions = params.total_question;
    const tags = params.tags;
    const difficulty = [params.nb_quest1, params.nb_quest2, params.nb_quest3, params.nb_quest4]; // 1, 2, 3, 4
    // const totalDifficulty = difficulty.reduce((a, b) => a + b, 0);   ?????????????????????????
    const questions = await Questions.find({tags: {$in: tags}, verified: true});
    let questionsToReturn = [];
    for (let i = 0; i < questions.length; i++) {
        if(difficulty[questions[i].difficulty - 1] > 0 && questionsToReturn.length < totalQuestions){
            questionsToReturn.push(questions[i]);
            difficulty[questions[i].difficulty - 1]--;
        }
    }

    for (let i = questionsToReturn.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionsToReturn[i], questionsToReturn[j]] = [questionsToReturn[j], questionsToReturn[i]];
    }
    return questionsToReturn;
}

const getQuestion = (i)=>{
    return questions[i];
}

const playGame = async (params) => {
    questions = await searchForQuestions(params);
    currentQuestion = 0;
    
}

module.exports = { playGame, getQuestion, searchForQuestions };