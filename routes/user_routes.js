const router = require("express").Router()
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res) => {
    try {
        const { email, name, phone, password, passwordCheck } = req.body

        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ msg: 'Не всі поля введені' })
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "Пароль повинен містити не менше 5 символів" })
        }
        if (name.length < 1) {
            return res.status(400).json({ msg: "Введіть своє ім'я, будь ласка" })
        }
        if (phone.length <= 9) {
            return res.status(400).json({ msg: "Телефон повинен мастити не менше 5 символів" })
        }
        if (passwordCheck !== password) {
            return res.status(400).json({ msg: "Паролі не співпадають" });
        }

        const existingUserWithSuchEmail = await User.findOne({ "email.address": email })
        if (existingUserWithSuchEmail) {
            return res.status(400).json({ msg: "Обліковий запис із цією електронною адресою вже існує" })
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            email: {
                address: email,
                visibility: true
            },
            password: passwordHash,
            roleId: 0,
            name,
            phone
        })
        const savedUser = await newUser.save()

        res.json(savedUser)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

//GOOGLE auth
router.post('/googleUserAuth', async (req, res) => {
    try {
        const { email, password } = req.body

        const alreadyRegisteredGoogleUser = await User.findOne({ email: email })
        if (alreadyRegisteredGoogleUser !== null) {
            res.json(alreadyRegisteredGoogleUser)
        } else {
            const salt = await bcrypt.genSalt()
            const passwordHash = await bcrypt.hash(password, salt)
            const newUser = new User({
                email,
                password: passwordHash,
                roleId: 0
            })
            const savedUser = await newUser.save()
            res.json(savedUser)
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ msg: "Не всі поля введені" })
        }
        const userAcc = await User.findOne({ "email.address": email })
        if (!userAcc) {
            return res.status(400).json({ msg: "Жодного облікового запису з цією електронною поштою не зареєстровано " })
        }

        const isMatch = await bcrypt.compare(password, userAcc.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Недійсні облікові дані" })
        }

        const token = jwt.sign({ id: userAcc._id }, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: userAcc._id,
                role: userAcc.roleId,
                email: userAcc.email.address,
                name: userAcc.name
            }
        })

    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token")
        // console.log(token)
        if (!token) return res.json(false)

        if (token.length < 500) {
            const verified = jwt.verify(token, process.env.JWT_SECRET)

            if (!verified) return res.json(false)
            const user = await User.findById(verified.id)
            if (!user) return res.json(false)
            return res.json(true)
        } else {
            const verified = jwt.decode(token)

            if (!verified) return res.json(false)
            const user = await User.findOne({ email: verified.email })
            if (!user) return res.json(false)
            return res.json(true)
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.get("/getme", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        id: user.id,
        role: user.roleId,
        email: user.email.address,
        name: user.name
    })
})

module.exports = router
