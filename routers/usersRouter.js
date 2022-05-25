const express = require('express')
const validator = require('validator');
const mongoose = require('mongoose') 
const User = require('../model/user')
const encrypt = require('../util/encryption')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

const router = express.Router();
const collection = db.collection('users');



// Getting all
router.get('/users', async (req, res) => {

    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

});


// Getting One
router.get('/user', getUser, (req, res) => {

    res.json(res.user)

});


// Creating one
router.post('/user', async (req, res) => {
    const validation = req.body.validationAnswer.toLowerCase().trim()
    if (!validator.equals(validation, process.env.VALIDATION_ANSWER_A) &&
        !validator.equals(validation, process.env.VALIDATION_ANSWER_B) &&
        !validator.equals(validation, process.env.VALIDATION_ANSWER_C) 
        ) {

            res.status(400).send("Wrong answer to validation question")
            return
            
        }


    const user = new User({
        username: req.body.username
    })
    await encrypt(req.body.password)
        .then(encryptedPassword => { 
            user.password = encryptedPassword
        })
        .catch(err => console.log(err));

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Updating one
router.patch('/user', getUser, async(req, res) => {
    
    if (req.body.firstname != null) {
        res.user.firstname = req.body.firstname
    }
    if (req.body.lastname != null) {
        res.user.lastname = req.body.lastname
    }
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.avatar != null) {
        res.user.avatar = req.body.avatar
    }
    if (req.body.city != null) {
        res.user.city = req.body.city
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Deleting One
router.delete('/user/', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: 'Deleted user'})   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Middleware
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
