const express = require('express')
const router = express.Router()
const { Followers } = require('../models/')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post('/', validateToken, async (req, res) => {
    const data = req.body
    const followerId = req.user.id
    const UserId = req.body.userId
    data.followerId = followerId

    await Followers.create(data)
    res.json(data)
})

router.get('/byUser', validateToken, async (req, res) => {
    const userId = req.user.id
    const followers = await Followers.findAll({ where: { UserId: userId } })
    res.json(followers)
})

module.exports = router