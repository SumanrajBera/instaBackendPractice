const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    const { username, email, bio, password, profileImg } = req.body

    const isExist = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (isExist) {
        return res.status(409).json({
            message: "User with such email or username already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        bio,
        password: hash,
        profileImg
    })

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "User registration successful",
        data: {
            username,
            email,
            bio,
            profileImg: newUser.profileImg
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "User with such email or username doesn't exist"
        })
    }

    let verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
        return res.status(401).json({
            message: "Password is invalid"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "Login successful",
        userData: {
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerController,
    loginController
}