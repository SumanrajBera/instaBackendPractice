const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const followRouter = require("./routes/user.route")

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", followRouter)

module.exports = app