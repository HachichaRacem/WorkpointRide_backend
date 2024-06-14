const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const isAuth = require("../middleware/auth.middleware");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *          description: The user's first name
 *        lastName:
 *          type: string
 *          description: The user's last name
 *        email:
 *          type: string
 *          description: The user's email
 *        phoneNumber:
 *          type: integer
 *          description: The user's phone number
 *        password:
 *          type: string
 *          description: The user's password
 *        role:
 *          type: string
 *          description: The user's role
 *        isBlocked:
 *          type: boolean
 *          description: Whether the user is blocked or not
 *          default: false
 *        favoritePlaces:
 *          type: array
 *          description: The user's favorite places
 * /api/users/register:
 *  post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: Bad request
 * /api/users/login:
 *  post:
 *    summary: Login a user
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: User was logged in successfully
 * /api/users/{email}:
 *  get:
 *    summary: Get a user
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: User was retrieved successfully
 *  put:
 *    summary: Update a user
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: User was updated successfully
 *  delete:
 *    summary: Delete a user
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: User was deleted successfully
 */

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);
router.get("/:id", isAuth, UserController.getUser);
router.put("/:id", isAuth, UserController.updateUser);
router.delete("/:id", isAuth, UserController.deleteUser);

module.exports = router;
