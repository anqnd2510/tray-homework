const mongoose = require('mongoose');

// Tạo schema cho Class
const classSchema = new mongoose.Schema({
    class_name: {
        type: String,
        required: true,
        trim: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    slots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slot', 
        }
    ],
    created_at: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Class = mongoose.model('Class', classSchema, "classes");
module.exports = Class;
