const express = require("express")
const { postController, getPosts } = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require('multer')
const identifyUser = require("../middlewares/auth.middleware")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/**
 * @route /api/posts/
 * @method POST
 * @description To create a post
 */
postRouter.post("/", identifyUser, upload.single("image"), postController)

/**
 * @route /api/posts/
 * @method GET
 * @description To get all post
 */
postRouter.get("/", identifyUser, getPosts)


module.exports = postRouter