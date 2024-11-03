const Class = require('../models/class.model');
const User = require('../models/user.model');

const createNewClass = async (classData) => {
    return await Class.create(classData);
};

const getAllClasses = async () => {
    return await Class.find().populate('user_id').populate('slots');
};

const getClassById = async (classId) => {
    return await Class.findById(classId).populate('user_id').populate('slots');
};

const updateClassById = async (classId, updateData) => {
    return await Class.findByIdAndUpdate(classId, updateData, {
        new: true,
        runValidators: true
    });
};

const deleteClassById = async (classId) => {
    return await Class.findByIdAndDelete(classId);
};

const getClassesByUserId = async (userId) => {
    const classes = await Class.findOne({
        student_list: userId
    });
    return classes;
};

const addStudentToClass = async (user, {
    name,
    className,
    zipCode
}) => {
    if (user.role !== 'student') {
        throw new Error('Access denied. Only students can join classes.');
    }

    const teacher = await User.findOne({
        username: name,
        role: 'teacher'
    });
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    const classToJoin = await Class.findOne({
        user_id: teacher._id,
        class_name: className,
        zip_code: zipCode
    });

    if (!classToJoin) {
        throw new Error('Class not found');
    }

    if (classToJoin.student_list.includes(user._id)) {
        throw new Error('You have already joined this class');
    }

    if (classToJoin.number_of_students >= classToJoin.student_limit) {
        throw new Error('Class is full. Cannot join.');
    }

    classToJoin.student_list.push(user._id);
    classToJoin.number_of_students += 1;
    await classToJoin.save();

    return {
        message: 'Successfully joined the class'
    };
};

module.exports = {
    createNewClass,
    getAllClasses,
    getClassById,
    getClassesByUserId,
    updateClassById,
    deleteClassById,
    addStudentToClass
};