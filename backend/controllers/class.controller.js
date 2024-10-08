const Class = require('../models/class.model');
const User = require('../models/user.model');
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
        const classId = req.params.id;
        const classItem = await Class.findById(classId).populate('user_id').populate('slots');
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
module.exports.deleteClass = async (req, res) => {
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

//[POST]/v1/classes/join
module.exports.joinClass = async (req, res) => {
    try {
        const { name, className, zipCode } = req.body;
        const user = req.user

        if(user.role !== 'student') {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Only students can join classes.' 
            });
        }

        const teacher = await User.findOne({ 
            username: name, 
            role: 'teacher' 
        });

        if(!teacher) {
            return res.status(404).json({ 
                success: false, 
                message: 'Teacher not found' 
            });
        }

        const classToJoin = await Class.findOne({ 
            user_id: teacher._id, 
            class_name: className, 
            zip_code: zipCode 
        });

        if (!classToJoin) {
            return res.status(404).json({ 
                success: false, 
                message: 'Class not found' 
            });
        }

        if (classToJoin.student_list.includes(user._id)) {
            return res.status(400).json({ 
                success: false, 
                message: 'You have already joined this class' 
            });
        }

        if (classToJoin.number_of_students >= classToJoin.student_limit) {
            return res.status(400).json({ 
                success: false, 
                message: 'Class is full. Cannot join.' 
            });
        }

        classToJoin.student_list.push(user._id);
        classToJoin.number_of_students += 1; 
        await classToJoin.save();

        res.status(200).json({ 
            success: true, 
            message: 'Successfully joined the class' 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};