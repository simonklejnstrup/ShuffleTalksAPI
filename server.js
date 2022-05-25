require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose') 

mongoose.connect(process.env.MONGODB_URI,() => console.log('Connected to DB'))
const db = mongoose.connection


app.use(express.json())

const usersRouter =  require('./routers/usersRouter');
app.use(usersRouter)

const postsRouter =  require('./routers/postsRouter');
app.use(postsRouter)

const commentsRouter =  require('./routers/commentsRouter');
app.use(commentsRouter)



const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    console.log("Server is running on", PORT);
});

