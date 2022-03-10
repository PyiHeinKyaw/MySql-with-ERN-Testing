const express = require('express')
const router = express.Router()
const { Followers } = require('../models/')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post('/', validateToken, async (req, res) => {

    const data = req.body
    const followerId = req.user.id

    data.followerId = followerId

    const follower = await Followers.findOne({ where: { followerId: followerId, UserId: data.UserId } })

    if (followerId === data.UserId) {
        res.json({ error: "You can't follow yourself" })
    }
    else if (follower) {
        const id = follower.id
        await Followers.destroy({ where: { id: id } })

        res.json({
            status: false,
            msg: 'Follow Removed'
        })
    }
    else {
        await Followers.create(data)
        res.json({
            status: true,
            msg: 'Following'
        })
    }
})

router.get('/byUser/:id', validateToken, async (req, res) => {
    const userId = req.params.id
    const followers = await Followers.findAll({ where: { UserId: userId } })
    res.json(followers)
})

router.get('/checkFollow/:id', validateToken, async (req, res) => {
    const followerId = req.user.id
    const userId = req.params.id

    const isFollow = await Followers.findOne({ where: { followerId: followerId, UserId: userId } })
    isFollow ? res.json(true) : res.json(false)

})

module.exports = router