const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// auth routes
const users = require('./routes/Users')
app.use('/auth', users)

// posts routes
const posts = require('./routes/Posts')
app.use('/posts', posts)

// likes routes
const comments = require('./routes/Comments')
app.use('/comments', comments)

// likes routes
const likes = require('./routes/Likes')
app.use('/likes', likes)


const port = 3030

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`app is running on port ${port}`))
})