const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {

    const accessToken = req.header("accessToken")

    if (!accessToken) {
        res.json({ error: "Deny for authorization" })
    }
    else {
        try {
            const validToken = verify(accessToken, "importantsecret")

            // Initialize user from token
            req.user = validToken

            if (validToken) {
                return next()
            }

        } catch (err) {
            return res.json({ error: err })
        }
    }


}

module.exports = { validateToken }