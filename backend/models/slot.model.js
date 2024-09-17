const mongoose = require('mongoose');

// Tạo schema cho Slot
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
    end_time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not started', 'Ongoing', 'Completed'],
        default: 'Not started',
    },
    questions: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        }
    ]
}, {
    timestamps: true,
});

const Slot = mongoose.model('Slot', slotSchema, 'slots');
module.exports = Slot;