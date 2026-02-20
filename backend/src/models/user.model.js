const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "An account with such username alread exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "An account with such email already exists"],
        required: [true, "Email is required"]
    },
    bio: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/sxeq10eu8/defaultProfileImg.avif"
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel