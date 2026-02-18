const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const postModel = require('../models/post.model');

async function postController(req, res) {
    const { caption } = req.body

    const client = new ImageKit({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });

    const imgUrl = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'image',
        folder: "instaProjPract-posts"
    });

    const post = await postModel.create({
        caption,
        image: imgUrl.url,
        author: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPosts(req, res) {
    const userId = req.user.id

    const posts = await postModel.find({ author: userId })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

module.exports = {
    postController,
    getPosts
}