const express = require('express')
const mongoose = require('mongoose') 
const Post = require('../model/post')
const User = require('../model/user')
const { ObjectId } = require('mongodb');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true} || 'mongodb://localhost/shuffletalk')
const db = mongoose.connection
const router = express.Router();


// Creating new comment
router.post('/comment', getPost, getUser, async (req, res) => {

    const comment = {
        text: req.body.text,
        userId: req.body.userId,
        username: req.body.username
    }
    try {
        res.post.comments.push(comment)

        // Increment postcount for user
        // const filter = { _id: req.body.userId }
        // const update = { $inc: { postCount: 1} }
        // user = await User.updateOne(filter, update)

        
        const newPost = await res.post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400)
    }
});


// Updating comment
router.patch('/comment', async(req, res) => {

    try {
        const updatedPost = await Post.updateOne({'comments._id': req.body.commentId}, 
                                                 {'$set': { 'comments.$.text': req.body.text}})
        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Creating a 'like'
router.post('/comment/like', getPost, async(req, res) => {
    
    try {
        const likedComment = res.post.comments.find(comment => comment._id.equals(req.body.commentId))
        likedComment.likes.push({   "userId": req.body.userId,
                                    "username": req.body.username})

        const newPost = await res.post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Deleting a 'like'
router.delete('/comment/like', getPost, async(req, res) => {

    try {
        const likedComment = res.post.comments.find(comment => comment._id.equals(req.body.commentId))
        likedComment.likes = likedComment.likes.filter(userId => userId.equals(req.body.userId)) 

        const newPost = await res.post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Creating a new post with quotation
router.post('/comment/quote', getPost, async(req, res) => {
    
    try {
        const commentsArray = res.post.comments
        const quotedComment = commentsArray.find(comment => comment._id.equals(req.body.quotetCommentId))
        
        const comment = {
            text: req.body.newCommentText,
            username: req.body.newCommentUsername,
            userId: req.body.newCommentUserId,
            quotes: []
        }
        const quote = {
            commentId: req.body.quotetCommentId,
            username: req.body.quotedCommentUsername,
            userId: req.body.quotetCommentUserId,
            text: req.body.quotetCommentText
        }
        comment.quotes.push(...quotedComment.quotes, quote) 
        res.post.comments.push(comment)
        const newPost = await res.post.save()
        res.status(201).json(newPost)
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