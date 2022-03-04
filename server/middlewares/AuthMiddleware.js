const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {

    const accessToken = req.header("accessToken")


    if (!accessToken) {
        res.json({ error: "User doesn't exit!!" })
    }
    else {
        try {
            const validToken = verify(accessToken, "importantsecret")

            if (validToken) {
                return next()
            }

        } catch (err) {
            return res.json({ error: err })
        }
    }


}

module.exports = { validateToken }