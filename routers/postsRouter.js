const express = require('express')
const validator = require('validator');
const mongoose = require('mongoose') 
const Post = require('../model/post')
const User = require('../model/user')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true} || 'mongodb://localhost/shuffletalk')
const db = mongoose.connection

const router = express.Router();
const collection = db.collection('posts');

// Getting all
router.get('/posts', async (req, res) => {

    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

});


// Getting One
router.get('/post', getPost, (req, res) => {

    res.json(res.post)

});


// Creating one
router.post('/post', getUser, async (req, res) => {

    const post = new Post()
    const comment = {
        text: req.body.text,
        userId: req.body.userId,
        username: req.body.username
    }
    post.comments.push(comment)
    try {
        // Increment postcount for user
        const filter = { _id: req.body.userId }
        const update = { $inc: { postCount: 1} }
        user = await User.updateOne(filter, update)

        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400)
    }
})

//Updating one
router.patch('/post', getPost, async(req, res) => {
    
    if (req.body.text != null) {
        res.post.text = req.body.text
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Deleting One
router.delete('/post', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({message: 'Deleted post'})   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Middleware
async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.body.postId)
        if (post == null) {
            return res.status(404).json({message: 'Could not find post'})
        } 
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    res.post = post
    next()
}

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.body.userId)
        if (user == null) {
            return res.status(404).json({message: 'Could not find user'})
        } 
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    res.user = user
    next()
}



module.exports = router