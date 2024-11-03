const feedbackService = require('../services/feedback.service');

// [GET]/v1/feedbacks/
module.exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedbacks();
        res.status(200).json({
            success: true,
            data: feedbacks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// [POST]/v1/feedbacks/submit-feedback
module.exports.submitFeedback = async (req, res) => {
    const userId = req.user._id;
    const userRole = req.user.role;
    const feedbackData = req.body;

    try {
        const feedback = await feedbackService.submitFeedback(userId, userRole, feedbackData);
        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: feedback
        });
    } catch (error) {
        res.status(error.message.includes('Only students') ? 403 : 400).json({
            success: false,
            message: error.message
        });
    }
};

// [GET]/v1/feedbacks/class/:classId
module.exports.getFeedbackByClassId = async (req, res) => {
    const classId = req.params.classId;
    try {
        const feedbacks = await feedbackService.getFeedbackByClassId(classId);
        res.status(200).json({
            success: true,
            data: feedbacks
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};