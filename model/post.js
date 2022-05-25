const mongoose = require("mongoose")



const commentsSchema = new mongoose.Schema({
    
    userId: String, 
    text: String,
    quote: { _id: String, username: String, userId: String, text: String },
    likes: [{userId: String}] },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}}
    )

const postSchema = new mongoose.Schema(

    { comments: [commentsSchema] },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} })



module.exports = mongoose.model("Post", postSchema)