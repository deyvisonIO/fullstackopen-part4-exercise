const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { mongoUrl, PORT } = require('./utils/config')
const blogRouter = require('./controllers/blogs')

mongoose.connect(mongoUrl).then(() => {
  console.log("Database connected!")
}).catch(() => {
  console.log("Failed to connect to database!")
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
