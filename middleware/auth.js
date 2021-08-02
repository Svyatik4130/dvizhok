const jwt = require("jsonwebtoken")
const router = require("../routes/user_routes")
const User = require("../models/userModel")

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        // console.log('22', token)
        if (!token) {
            return res.status(401).json({ msg: "no authentication token, authorisation denied" })
        }

        if (token.length < 500) {
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            console.log(verified)

            if (!verified) {
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
        res.status(500).json(err.message)
    }
}

module.exports = auth
