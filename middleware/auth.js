const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        const signature = req.header("secret")
        if (!token) {
            return res.status(401).json({ msg: "no authentication token, authorisation denied" })
        }

        if (token.length < 500) {
            const verified = jwt.verify(token, process.env.JWT_SECRET)

            if (!verified) {
                return res.status(401).json({ msg: "Token authentification denied" })
            }
            if (verified.key !== signature) {
                return res.status(401).json({ msg: "Token authentification denied" })
            }
            req.user = verified.id
            next()
        } else {
            const verified = jwt.decode(token)

            if (!verified) {
                return res.status(401).json({ msg: "Token authentification denied" })
            }
            const user = await User.findOne({ email: verified.email })
            req.user = user.id
            next()
        }
    } catch (err) {
        console.log("error")
        res.status(500).json(err.message)
    }
}

module.exports = auth
