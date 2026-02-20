const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const { followUser, unfollowUser, getPendingRequests, acceptRequest, rejectRequest } = require("../controllers/follow.controller")
const followRouter = express.Router()

/**
 * @route /api/user/follow/:username
 * @method POST
 * @description To follow a user
 */
followRouter.post("/follow/:username", identifyUser, followUser)

/**
 * @route /api/user/unfollow/:username
 * @method POST
 * @description To unfollow a user
 */
followRouter.post("/unfollow/:username", identifyUser, unfollowUser)

/**
 * @route /api/user/requests
 * @method GET
 * @description To get all requests
 */
followRouter.get("/requests", identifyUser, getPendingRequests)

/**
 * @route /api/user/accept/:username
 * @method POST
 * @description To accept a pending request
 */
followRouter.post("/accept/:username", identifyUser, acceptRequest)

/**
 * @route /api/user/reject/:username
 * @method POST
 * @description To reject a pending request
 */
followRouter.post("/reject/:username", identifyUser, rejectRequest)

module.exports = followRouter