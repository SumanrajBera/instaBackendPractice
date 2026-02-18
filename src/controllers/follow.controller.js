const followModel = require("../models/follow.model");
const userModel = require("../models/user.model")

async function followUser(req, res) {
    const user = req.user.username
    const followeeusername = req.params.username

    if (user === followeeusername) {
        return res.status(401).json({
            message: "Following yourself is not allowed"
        })
    }

    const followee = await userModel.findOne({
        username: followeeusername
    });

    if (!followee) {
        return res.status(404).json({
            message: "The user you are trying to follow doesn't exist"
        })
    }

    const isExist = await followModel.findOne({
        follower: user,
        followee: followeeusername
    })

    if (isExist) {
        return res.status(401).json({
            message: "You have already requested"
        })
    }

    const request = await followModel.create({
        follower: user,
        followee: followeeusername
    })

    res.status(201).json({
        message: "Follow request sent",
        request
    })
}

async function unfollowUser(req, res) {
    const followerusername = req.user.username
    const followeeusername = req.params.username

    const isExist = await followModel.findOne({
        follower: followerusername,
        followee: followeeusername
    })

    if (!isExist) {
        return res.status(404).json({
            message: `You haven't sent request to ${followeeusername}`
        })
    }

    await followModel.findOneAndDelete({
        follower: followerusername,
        followee: followeeusername
    })

    res.status(200).json({
        message: `You have unfollowed ${followeeusername}`
    })
}

async function getPendingRequests(req, res) {
    
}

module.exports = {
    followUser,
    unfollowUser,
    getPendingRequests
}