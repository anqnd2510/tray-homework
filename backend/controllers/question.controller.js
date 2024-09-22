const Question = require('../models/question.model');
const Slot = require('../models/slot.model');
//[GET]/v1/questions/
module.exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user_id').populate('slot_id');
        res.status(200).json({
            success: true,
            data: questions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//[GET]/v1/questions/detail/:id
module.exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('user_id').populate('slot_id');
        if (!question) {
            return res.status(404).json({
                success: false,
                error: 'Question not found'
            });
        }
        res.status(200).json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//[POST]/v1/questions/create
module.exports.createQuestion = async (req, res) => {
    try {
        const { user_id, slot_id, question_text, choices } = req.body;

        const slot = await Slot.findById(slot_id);
        if (!slot) {
            return res.status(404).json({ success: false, message: 'Slot not found' });
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

        res.status(201).json({ success: true, data: newQuestion });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

//[PATCH]/v1/questions/delete/:id
module.exports.updateQuestion = async (req, res) => {
    try {
        const { question_text, choices } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { question_text, choices },
            { new: true }
        );
        if (!updatedQuestion) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }

        res.status(200).json({
            success: true,
            data: updatedQuestion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//[DELETE]/v1/questions/delete/:id
module.exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }

        await Slot.updateOne(
            { _id: question.slot_id }, 
            { $pull: { questions: question._id } 
        });
        res.status(200).json({ success: true, message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


