const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    avatar: String,
    city: String,
    email: String,
    createdAt: {
        type: Date, 
        immutable: true,
        default: () => Date.now()
    },
    postCount: Number
})



module.exports = mongoose.model("User", userSchema)