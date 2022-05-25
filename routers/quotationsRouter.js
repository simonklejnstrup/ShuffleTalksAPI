const express = require('express')
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose') 
const Post = require('../model/post')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true} || 'mongodb://localhost/shuffletalk')
const db = mongoose.connection
const router = express.Router();


// Creating new comment with a quotation
router.post('/quotation', getPost, async (req, res) => {

    const comment = {
        text: req.body.text,
        userId: req.body.userId,
    }
    try {
        res.post.comments.push(comment)
        const newPost = await res.post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400)
    }
});


//Updating one
router.patch('/quotation', async(req, res) => {

    try {
        const updatedPost = await Post.updateOne({'comments._id': req.body.commentId}, 
                                                 {'$set': { 'comments.$.text': req.body.text}})
        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Creating a 'like'
router.post('/quotation', async(req, res) => {

    try {
        const updatedPost = await Post.updateOne({'comments._id': req.body.commentId}, 
                                                 {'$pull': { 'comments.$.likes': { "userId": req.body.userId }}},
                                                 { returnDocument: 'after' })
        res.status(201).json(updatedPost)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

// Deleting a 'like'
router.delete('/comment/like', async(req, res) => {

    try {
        const updatedPost = await Post.updateOne({'comments._id': req.body.commentId}, 
                                                 {'$push': { 'comments.$.likes': { "userId": req.body.userId }}},
                                                 { returnDocument: 'after' })
        res.status(201).json(updatedPost)
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


module.exports = router