const Feedback = require('../models/feedback.model');
const Class = require('../models/class.model');
const User = require('../models/user.model');

//[GET]/v1/feedbacks/

//[POST]/v1/feedbacks/submit-feedback
module.exports.submitFeedback = async (req, res) => {
    const {
        class_id,
        description,
        love_teacher,
        love_class
    } = req.body;
    const user_id = req.user._id;
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Only students can submit feedback'
            });
        }

        const classExists = await Class.findById(class_id).populate('user_id');
        if (!classExists) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }

        const teacher = classExists.user_id;
        if (teacher.role !== 'teacher') {
            return res.status(400).json({
                success: false,
                message: 'The user associated with the class is not a teacher'
            });
        }

        const feedback = new Feedback({
            user_id,
            class_id,
            start_date: classExists.from_date,
            end_date: classExists.to_date,
            description,
            love_teacher,
            love_class
        });

        await feedback.save();

        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: feedback
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}