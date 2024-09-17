const express = require('express');
const router = express.Router();
const controller = require('../../controllers/slot.controller');

router.post('/create', controller.createSlot);

router.get('/', controller.getAllSlots);

router.get('/detail/:id', controller.getSlotById);

router.patch('/update/:id', controller.updateSlot);

router.delete('/delete/:id', controller.deleteSlot);

module.exports = router;