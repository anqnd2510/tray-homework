const express = require('express');
const router = express.Router();

const controller = require('../../controllers/slot.controller');
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

router.post('/create', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.createSlot);

router.get('/', authMiddleware.auth,controller.getAllSlots);

router.get('/detail/:id', authMiddleware.auth,controller.getSlotById);

router.patch('/update/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.updateSlot);

router.delete('/delete/:id', authMiddleware.auth, roleMiddleware.checkRole(['teacher']), controller.deleteSlot);

module.exports = router;