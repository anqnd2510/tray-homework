const classService = require('../services/class.service');

//[POST]/v1/classes/create
module.exports.createClass = async (req, res) => {
    try {
        const newClass = await classService.createNewClass(req.body);
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
        const classes = await classService.getAllClasses();
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
        const classId = req.params.id;
        const classItem = await classService.getClassById(classId);
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
// có vấn đề với việc update class
module.exports.updateClass = async (req, res) => {
    const {
        id
    } = req.params;
    const updateData = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Invalid class ID'
        });
    }
    try {

        const classItem = await classService.updateClassById(id, updateData);
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
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//[DELETE]/v1/classes/delete/:id
module.exports.deleteClass = async (req, res) => {
    try {
        const classItem = await classService.deleteClassById(req.params.id);
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

//[POST]/v1/classes/join
module.exports.joinClass = async (req, res) => {
    try {
        const data = await classService.addStudentToClass(req.user, req.body);

        res.status(200).json({
            success: true,
            message: data.message
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// [GET]/v1/classes/user/:userId
module.exports.getClassesByUserId = async (req, res) => {
    try {
        const classes = await classService.getClassesByUserId(req.params.userId);
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