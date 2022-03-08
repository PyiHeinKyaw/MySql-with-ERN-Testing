const express = require('express')
const router = express.Router()
const { Users } = require('../models/')
const bcrypt = require('bcrypt')
const { validateToken } = require("../middlewares/AuthMiddleware")

const { sign } = require('jsonwebtoken')


router.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({ where: { username: username } })

    if (user)
        res.json({ error: "User Already Exists" })
    else
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash
            })
            res.json('Success')
        })
})

router.post('/login', async (req, res) => {

    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } })

    if (!user) res.json({ error: "User Doesn't Exist!" });
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username And Password Combination" })
            }
            else {
                const accessToken = sign({
                    username: user.username,
                    id: user.id
                }, 'importantsecret')

                res.json({ token: accessToken, username: username, id: user.id })
            }
        })
    }
})

router.get('/checkauth', validateToken, async (req, res) => {
    res.json(req.user)
})


router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPass, newPass } = req.body
    const user = await Users.findOne({ where: { id: req.user.id } })

    bcrypt.compare(oldPass, user.password).then(async (match) => {
        if (!match) {
            res.json({ error: "Wrong Password Entered!" })
        } else {
            bcrypt.hash(newPass, 10).then((hash) => {
                Users.update(
                    { password: hash },
                    { where: { id: req.user.id } }
                )
                res.json("Password Update Success")
            })
        }
    })
})

router.get('/:id', validateToken, async (req, res) => {
    const userId = req.params.id
    const user = await Users.findOne({ where: { id: userId } })
    res.json(user)
})

module.exports = router