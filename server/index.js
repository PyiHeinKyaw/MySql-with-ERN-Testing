const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// posts routes
const posts = require('./routes/Posts')
app.use('/posts', posts)

// posts routes
const comments = require('./routes/Comments')
app.use('/comments', comments)


// users routes
const users = require('./routes/Users')
app.use('/users', users)

const port = 3030

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`app is running on port ${port}`))
})