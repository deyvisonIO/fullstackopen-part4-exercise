require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URL: MONGODB_URL } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')


if(process.env.NODE_ENV !== "test") {
  mongoose.connect(MONGODB_URL).then(() => {
    console.log("Database connected!")
  }).catch((error) => {
    console.log(error)
    console.log("Failed to connect to database!")
  })
}

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


module.exports = app;

