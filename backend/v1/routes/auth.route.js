const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.controller');
const authmiddleware = require('../../middlewares/auth.middleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: The password of the user
 *               role:
 *                 type: string
 *                 example: "student"
 *                 description: The role of the user (student, teacher, admin)
 *               profile_picture:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *                 description: URL of the profile picture
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               phone_number:
 *                 type: string
 *                 example: "+84123456789"
 *                 description: The user's phone number
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *                 description: The user's address
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email/username already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", controller.registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", controller.loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful, clears tokens from cookies
 *       500:
 *         description: Internal server error
 */
router.post("/logout", authmiddleware.auth, controller.logoutUser);


module.exports = router;