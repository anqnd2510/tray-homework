const Question = require('../models/question.model');
const Slot = require('../models/slot.model');

const getAllQuestions = async () => {
    return await Question.find();
};

const getQuestionById = async (id) => {
    return await Question.findById(id).populate('user_id').populate('slot_id');
};

const createQuestion = async (questionData) => {
    const {
        user_id,
        slot_id,
        question_text,
        choices
    } = questionData;
    const slot = await Slot.findById(slot_id);
    if (!slot) {
        throw new Error('Slot not found');
    }

    const newQuestion = new Question({
        user_id,
        slot_id,
        question_text,
        choices,
    });

    await newQuestion.save();

    slot.questions.push(newQuestion._id);
    await slot.save();

    return newQuestion;
};

const updateQuestion = async (id, updateData) => {
    const {
        question_text,
        choices
    } = updateData;
    return await Question.findByIdAndUpdate(
        id, {
            question_text,
            choices
        }, {
            new: true
        }
    );
};

const deleteQuestion = async (id) => {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
        throw new Error('Question not found');
    }

    await Slot.updateOne({
        _id: question.slot_id
    }, {
        $pull: {
            questions: question._id
        }
    });

    return question;
};

const getQuestionsBySlotId = async (slotId) => {
    return await Question.find({
        slot_id: slotId
    });
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsBySlotId,
};