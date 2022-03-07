const express = require('express')
const router = express.Router()
const { Comments } = require('../models/')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    const comments = await Comments.findAll({
        where: { PostId: postId },
        order: [['id', 'DESC']]
    })
    res.json(comments)
})

router.post('/', validateToken, async (req, res) => {

    const comment = req.body
    const username = req.user.username

    // add username and id to comment request 
    comment.username = username
    comment.UserId = req.user.id
    await Comments.create(comment)
    res.json(comment)
})

router.delete('/:commentId', validateToken, async (req, res) => {
    const id = req.params.commentId

    await Comments.destroy({
        where: { id: id }
    })

    res.json("Comment deleted")
})

module.exports = router