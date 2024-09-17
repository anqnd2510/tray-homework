const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot', 
        required: true,
    },
    question_text: {
        type: String,
        required: true,
    },
    choices: [
        {
            choice_text: { 
                type: String, 
                required: true 
            },
            is_correct: { 
                type: Boolean, 
                default: false 
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Question = mongoose.model('Question', questionSchema, 'questions');
module.exports = Question;
