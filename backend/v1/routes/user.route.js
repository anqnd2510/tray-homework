const express = require('express');
const router = express.Router();

const controller = require("../../controllers/user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: student
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-01
 *               phone_number:
 *                 type: string
 *                 example: "123456789"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", authMiddleware.auth, roleMiddleware.checkRole(['admin']), controller.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with pagination
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *         example: 10
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of users
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     last_page:
 *                       type: integer
 *                       description: The last available page
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware.auth, controller.getAllUsers);

/**
 * @swagger
 * /users/detail/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get("/detail/:id", authMiddleware.auth, controller.getUserById);

/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: hehe
 *               role:
 *                 type: string
 *                 example: Teacher
 *               date_of_birth:
 *                 type: string
 *                 format: date-time
 *                 example: 2003-05-18T00:00:00.000Z
 *               email:
 *                 type: string
 *                 example: hehe@gmail.com
 *               phone_number:
 *                 type: string
 *                 example: 0912356789
 *               address:
 *                 type: string
 *                 example: 123 Street
 *               password:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch("/update/:id", authMiddleware.auth, controller.updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete/:id", authMiddleware.auth, roleMiddleware.checkRole(['admin']), controller.deleteUser);

module.exports = router;