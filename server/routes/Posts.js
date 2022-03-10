const express = require('express')
const router = express.Router()
const { Posts, Likes, Comments } = require('../models/')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll({
        order: [
            ['id', 'DESC']
        ],
        include: [Likes, Comments]
    })
    res.json(listOfPosts)
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

router.get('/byUser/:id', validateToken, async (req, res) => {
    const userId = req.params.id
    const posts = await Posts.findAll({ where: { UserId: userId } })
    res.json(posts)
})

router.post('/', validateToken, async (req, res) => {

    const post = req.body;
    post.username = req.user.username
    post.UserId = req.user.id
    await Posts.create(post);
    res.json(post);
})

router.delete('/:postId', validateToken, async (req, res) => {
    const id = req.params.postId
    Posts.destroy({ where: { id: id } })
    res.json("Post Deleted Successfully")
})

module.exports = router