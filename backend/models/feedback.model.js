const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    start_date: {
        type: Date,
        required: false
    },
    end_date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    love_teacher: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    love_class: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
}, {
    timestamps: true
});

const Feedback = mongoose.model("Feedback", feedbackSchema, "feedbacks");

module.exports = Feedback;