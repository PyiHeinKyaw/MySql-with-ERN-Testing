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

router.get('/byUser/', validateToken, async (req, res) => {
    const username = req.user.username
    const posts = await Posts.findAll({ where: { username: username } })
    res.json(posts)
})

router.post('/', validateToken, async (req, res) => {

    const post = req.body;
    post.username = req.user.username
    await Posts.create(post);
    res.json(post);
})

router.delete('/:postId', validateToken, async (req, res) => {
    const id = req.params.postId
    Posts.destroy({ where: { id: id } })
    res.json("Post Deleted Successfully")
})

module.exports = router