const Class = require('../models/class.model');

//[POST]/v1/classes/create
module.exports.createClass = async (req, res) => {
    try {
        const newClass = await Class.create(req.body);
        res.status(201).json({
            success: true,
            data: newClass
        });
        } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
//[GET]/v1/classes/
module.exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('user_id').populate('slots');
        res.status(200).json({
            success: true,
            count: classes.length,
            data: classes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

//[GET]/v1/classes/detail/:id
module.exports.getClassById = async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id).populate('user_id').populate('slots');
        if (!classItem) {
            return res.status(404).json({
                success: false,
                error: 'Class not found'
            });
        }
        res.status(200).json({
            success: true,
            data: classItem
        });
        } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

//[PATCH]/v1/classes/update/:id
module.exports.updateClass = async (req, res) => {
    try {
        const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!classItem) {
            return res.status(404).json({
                success: false,
                error: 'Class not found'
            });
        }
        res.status(200).json({
            success: true,
            data: classItem
        });
        } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

//[DELETE]/v1/classes/update/:id
exports.deleteClass = async (req, res) => {
    try {
        const classItem = await Class.findByIdAndDelete(req.params.id);
        if (!classItem) {
            return res.status(404).json({
                success: false,
                error: 'Class not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
        } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};