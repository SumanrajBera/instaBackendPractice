const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        required: [true, "ImgUrl is required for post"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User information required for posting"]
    }
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel