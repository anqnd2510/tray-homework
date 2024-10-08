const Answer = require('../models/answer.model');
const Question = require('../models/question.model');
const calculateScore = require('../utils/calculateScore');

// [POST]/v1/answers
module.exports.savedUserAnswer = async (req, res) => {
    try {
        const {
            user_id,
            slot_id,
            answers
        } = req.body;

        const userAnswers = await Promise.all(answers.map(async (userAnswer) => {
            const question = await Question.findById(userAnswer.question_id);

            if (!question) {
                throw new Error(`Question with ID ${userAnswer.question_id} not found`);
            }

            const selectedChoice = question.choices.find(
                (choice) => choice.choice_text === userAnswer.selected_choice
            );

            if (!selectedChoice) {
                throw new Error(`Selected choice '${userAnswer.selected_choice}' not found for question '${question._id}'`);
            }


            const isCorrect = selectedChoice.is_correct;

            return {
                question_id: userAnswer.question_id,
                selected_choice: userAnswer.selected_choice,
                is_correct: isCorrect,
            };
        }));

        const answer = new Answer({
            user_id,
            slot_id,
            answers: userAnswers,
        });

        await answer.save();

        return res.status(200).json({
            success: true,
            message: 'User answers saved successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// [GET]/v1/answers/score/:user_id/:slot_id
module.exports.getUserScoreForSlot = async (req, res) => {
    try {
        const {
            user_id,
            slot_id
        } = req.params;


        const userAnswers = await Answer.findOne({
            user_id,
            slot_id
        });

        if (!userAnswers) {
            return res.status(404).json({
                success: false,
                message: 'No answers found for this user and slot'
            });
        }

        // Calculate the score
        const correctAnswers = userAnswers.answers.filter(answer => answer.is_correct).length;
        const totalQuestions = userAnswers.answers.length;
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = await calculateScore(correctAnswers, totalQuestions);

        res.status(200).json({
            success: true,
            data: {
                total_questions: totalQuestions,
                correct_answers: correctAnswers,
                wrong_answers: wrongAnswers,
                score: score
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};