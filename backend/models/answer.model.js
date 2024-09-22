const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,  
    },
    answers: [
        {
            question_id: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question', 
                required: true,  
            },
            selected_choice: {
                type: String,
                required: true,
            },
            is_correct: {
                type: Boolean,  
                required: true,
            },
        }
    ],
    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,  
    },
    submitted_at: {
        type: Date,
        default: Date.now, 
    }
}, {
    timestamps: true,  
});

const Answer = mongoose.model('Answer', answerSchema, 'answers');
module.exports = Answer;