const Feedback = require('../models/feedback.model');
const Class = require('../models/class.model');
const User = require('../models/user.model');

const getAllFeedbacks = async () => {
    return await Feedback.find().populate('user_id').populate('class_id');
};

const submitFeedback = async (userId, userRole, feedbackData) => {
    const {
        class_id,
        description,
        love_teacher,
        love_class
    } = feedbackData;

    if (userRole !== 'student') {
        throw new Error('Only students can submit feedback');
    }

    const classExists = await Class.findById(class_id).populate('user_id');
    if (!classExists) {
        throw new Error('Class not found');
    }

    const teacher = classExists.user_id;
    if (teacher.role !== 'teacher') {
        throw new Error('The user associated with the class is not a teacher');
    }

    const existingFeedback = await Feedback.findOne({
        user_id: userId,
        class_id
    });
    if (existingFeedback) {
        throw new Error('You have already submitted feedback for this class');
    }

    const feedback = new Feedback({
        user_id: userId,
        class_id,
        start_date: classExists.from_date,
        end_date: classExists.to_date,
        description,
        love_teacher,
        love_class
    });

    return await feedback.save();
};

const getFeedbackByClassId = async (classId) => {
    const feedbacks = await Feedback.find({
        class_id: classId
    });
    if (!feedbacks || feedbacks.length === 0) {
        throw new Error('No feedbacks found for this class');
    }
    return feedbacks;
};

module.exports = {
    getAllFeedbacks,
    submitFeedback,
    getFeedbackByClassId
};