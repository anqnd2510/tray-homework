const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    slot_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    to_time: {
        type: String,
        required: true,
    },
    time_limit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    release_date: {
        type: Date,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not started', 'Ongoing', 'Completed'],
        default: 'Not started',
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }]
}, {
    timestamps: true,
});

const Slot = mongoose.model('Slot', slotSchema, 'slots');
module.exports = Slot;