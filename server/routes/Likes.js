const express = require('express')
const router = express.Router()
const { Likes } = require('../models/')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/byPost/:id', validateToken, async (req, res) => {
    const postId = req.params.id
    const userId = req.user.id

    const found = await Likes.findOne({ where: { PostId: postId, UserId: userId } })

    if (!found) {
        res.json({ likeStatus: false })
    }
    else {
        res.json({ likeStatus: true })
    }
})

router.post('/', validateToken, async (req, res) => {
    const userId = req.user.id
    const { PostId } = req.body

    const found = await Likes.findOne({ where: { PostId: PostId, UserId: userId } })

    if (!found) {
        await Likes.create({ PostId: PostId, UserId: userId })
        res.json({ likeStatus: true })
    }
    else {
        await Likes.destroy({
            where: { PostId: PostId, UserId: userId }
        })
        res.json({ likeStatus: false })
    }


})

module.exports = router