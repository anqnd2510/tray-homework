const Slot = require('../models/slot.model');
const Class = require('../models/class.model');

//[POST]/v1/slots/create
module.exports.createSlot = async (req, res) => {
    try {
        const newSlot = await Slot.create(req.body);

        await Class.findByIdAndUpdate(
            req.body.class_id,
            { $push: { slots: newSlot._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(201).json({
            success: true,
            data: newSlot
        });
        } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

//[GET]/v1/slots/
module.exports.getAllSlots = async (req, res) => {
    try {
        const slots = await Slot.find().populate('class_id').populate('questions');
        res.status(200).json({
            success: true,
            count: slots.length,
            data: slots
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

//[GET]/v1/slots/detail/:id
module.exports.getSlotById  = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id)
        .populate('class_id')
        .populate('questions');
        if (!slot) {
            return res.status(404).json({
            success: false,
            error: 'Slot not found'
        });
    }
    res.status(200).json({
        success: true,
        data: slot
    });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

//[PATCH]/v1/slots/update/:id
module.exports.updateSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!slot) {
            return res.status(404).json({
                success: false,
                error: 'Slot not found'
            });
        }
        res.status(200).json({
            success: true,
            data: slot
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

//[DELETE]/v1/slots/delete/:id
module.exports.deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (!slot) {
            return res.status(404).json({
            success: false,
            error: 'Slot not found'
            });
        }
        await Class.findByIdAndUpdate(
            slot.class_id,
            { $pull: { slots: slot._id } },
            { new: true, useFindAndModify: false }
        );

        await slot.remove();

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