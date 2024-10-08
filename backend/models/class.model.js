const mongoose = require('mongoose');

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
    zip_code: {
        type: String,
        trim: true,
    },
    student_limit: {
        type: Number,
        trim: true,
    },
    number_of_students: {
        type: Number,
        default: 0,
    },
    from_date: {
        type: Date,
        required: true,  
    },
    to_date: {
        type: Date,
        required: true,  
    },
    slots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slot', 
        }
    ],
    student_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

const Class = mongoose.model('Class', classSchema, "classes");
module.exports = Class;
