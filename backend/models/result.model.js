const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    results: {
        type: Array,
        default: []
    },
    attempts: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    achived: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    timestamps: true,
});

const Result = mongoose.model('Result', resultSchema, 'results');
module.exports = Result;