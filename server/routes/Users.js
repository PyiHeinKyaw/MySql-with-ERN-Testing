const express = require('express')
const router = express.Router()
const { Users } = require('../models')

router.get('/', async (req, res) => {
    const data = await Users.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json(data)
})

router.post('/', async (req, res) => {
    const user = req.body
    await Users.create(user)
    res.json(user)
})

module.exports = router