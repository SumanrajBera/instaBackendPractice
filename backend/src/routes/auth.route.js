const express = require("express")
const { registerController, loginController } = require("../controllers/auth.controller")
const authRouter = express.Router()

/**
 * @route /api/user/register
 * @method POST
 * @description TO register a user
 */
authRouter.post("/register", registerController)

/**
 * @route /api/user/login
 * @method POST
 * @description TO login a user
 */
authRouter.post("/login", loginController)

module.exports = authRouter