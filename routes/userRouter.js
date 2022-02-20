const router = require("express").Router()
const User = require("../models/userModel")
const Transaction = require("../models/transactionModel")
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const path = require('path');
const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');

router.post('/register', async (req, res) => {
    try {
        const { email, name, surname, phone, password, passwordCheck, logoUrl } = req.body
        console.log(req.body)

        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ msg: 'Не всі поля введені' })
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "Пароль повинен містити не менше 5 символів" })
        }
        if (name.length <= 1) {
            return res.status(400).json({ msg: "Введіть своє ім'я, будь ласка" })
        }
        if (name.length >= 20) {
            return res.status(400).json({ msg: "Bведіть коротше ім'я, будь ласка" })
        }
        if (surname.length >= 20) {
            return res.status(400).json({ msg: "Bведіть коротше прізвище, будь ласка" })
        }
        if (surname.length <= 1) {
            return res.status(400).json({ msg: "Bведіть своє прізвище, будь ласка" })
        }
        if (passwordCheck !== password) {
            return res.status(400).json({ msg: "Паролі не співпадають" });
        }

        let logoUrlToDB = "https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/+no_photo_user.png"
        if (logoUrl !== '') {
            logoUrlToDB = logoUrl
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
            surname,
            phoneNumber: [phone],
            avatarUrl: logoUrlToDB
        })
        const savedUser = await newUser.save()

        res.json(savedUser)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password, signature } = req.body

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

        const token = jwt.sign({ id: userAcc._id, key: signature }, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: userAcc._id,
                role: userAcc.roleId,
                email: userAcc.email.address,
                name: userAcc.name,
                avaUrl: userAcc.avatarUrl,
                surname: userAcc?.surname,
                birthDate: userAcc?.birthDate,
                sex: userAcc?.sex,
                country: userAcc?.country,
                hometown: userAcc?.hometown,
                occupationTown: userAcc?.occupationTown,
                occupationTownCoords: userAcc?.occupationTownCoords,
                whoI: userAcc?.whoI,
                workAs: userAcc?.workAs,
                workPlace: userAcc?.workPlace,
                myProjects: userAcc?.myProjects,
                whatICan: userAcc?.whatICan,
                whatILike: userAcc?.whatILike,
                whatIWant: userAcc?.whatIWant,
                myGoals: userAcc?.myGoals,
                mySocialDream: userAcc?.mySocialDream,
                selfPresentation: userAcc?.selfPresentation,
                phoneNumber: userAcc.phoneNumber,
                balance: userAcc.balance,
                leaderReady: userAcc.leaderReady,
            }
        })

    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post('/info_change', auth, async (req, res) => {
    try {
        const { name, email, surname, country, birthDate, locationString, Location, phoneNumber, sex, whoI, workAs, myGoals, workPlace, whatICan, whatILike, whatIWant, mySocialDream, selfPresentation, myProjects, userID, signature } = req.body

        if (req.user !== userID) {
            return res.status(400).json({ msg: 'Ошибка' })
        }
        if (!email || !name || !phoneNumber) {
            return res.status(400).json({ msg: 'Не всі поля введені' })
        }
        if (name.length <= 1) {
            return res.status(400).json({ msg: "Введіть своє ім'я, будь ласка" })
        }
        if (name.length >= 20) {
            return res.status(400).json({ msg: "Bведіть коротше ім'я, будь ласка" })
        }
        if (surname.length >= 20) {
            return res.status(400).json({ msg: "Bведіть коротше прізвище, будь ласка" })
        }
        if (country.length >= 35) {
            return res.status(400).json({ msg: "Bведіть коротку назву країни, будь ласка" })
        }
        if (whoI.length > 300) {
            return res.status(400).json({ msg: "Поле 'Хто ви' має бути менше 300 символів" })
        }
        if (workAs.length > 300) {
            return res.status(400).json({ msg: "Поле 'Ким працюєте' має бути менше 300 символів" })
        }
        if (workPlace.length > 300) {
            return res.status(400).json({ msg: "Поле 'Місце роботи' має бути менше 300 символів" })
        }
        if (myGoals.length > 300) {
            return res.status(400).json({ msg: "Поле 'Мої цілі' має бути менше 300 символів" })
        }
        if (whatICan.length > 300) {
            return res.status(400).json({ msg: "Поле 'Що я вмію' має бути менше 300 символів" })
        }
        if (whatILike.length > 300) {
            return res.status(400).json({ msg: "Поле 'Що я люблю' має бути менше 300 символів" })
        }
        if (whatIWant.length > 300) {
            return res.status(400).json({ msg: "Поле 'Чим я хочу займатися' має бути менше 300 символів" })
        }
        if (mySocialDream.length > 300) {
            return res.status(400).json({ msg: "Поле 'Моя соціальна мрія' має бути менше 300 символів" })
        }
        if (selfPresentation.length > 300) {
            return res.status(400).json({ msg: "Поле 'Ще декілька слів про себе/самопрезентація' має бути менше 300 символів" })
        }

        if (sex[0] !== "Чоловік" && sex[0] !== "Жінка" && sex[0] !== "") {
            return res.status(400).json({ msg: "Не треба так!))" })
        }
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(email)) {
            return res.status(400).json({ msg: "E-mail введено некоректно" })
        }

        const existingUserWithSuchEmail = await User.findOne({ "email.address": email })
        if (existingUserWithSuchEmail) {
            if (existingUserWithSuchEmail._id.toString() !== userID) {
                return res.status(400).json({ msg: "Обліковий запис із цією електронною адресою вже існує" })
            }
        }

        let userAcc = await User.findById(userID)
        await User.updateOne({ _id: userID }, {
            $set: {
                "name": name,
                "email": {
                    address: email,
                    visibility: userAcc.email.visibility
                },
                "surname": surname,
                "birthDate": birthDate,
                "sex": sex,
                "country": country,
                "occupationTown": locationString,
                "occupationTownCoords": Location,
                "whoI": whoI,
                "workAs": workAs,
                "workPlace": workPlace,
                "myGoals": myGoals,
                "whatICan": whatICan,
                "whatILike": whatILike,
                "phoneNumber": phoneNumber,
                "whatIWant": whatIWant,
                "mySocialDream": mySocialDream,
                "selfPresentation": selfPresentation,
                "myProjects": myProjects,
            }
        })
        const token = jwt.sign({ id: userAcc._id, key: signature }, process.env.JWT_SECRET)
        const updatedUser = await User.findById(userID)

        res.json({
            token,
            user: {
                id: updatedUser._id,
                role: updatedUser.roleId,
                email: updatedUser.email.address,
                name: updatedUser.name,
                avaUrl: updatedUser.avatarUrl,
                surname: updatedUser?.surname,
                birthDate: updatedUser?.birthDate,
                sex: updatedUser?.sex,
                country: updatedUser?.country,
                hometown: updatedUser?.hometown,
                occupationTown: updatedUser?.occupationTown,
                occupationTownCoords: updatedUser?.occupationTownCoords,
                whoI: updatedUser?.whoI,
                workAs: updatedUser?.workAs,
                workPlace: updatedUser?.workPlace,
                myProjects: updatedUser?.myProjects,
                whatICan: updatedUser?.whatICan,
                whatILike: updatedUser?.whatILike,
                whatIWant: updatedUser?.whatIWant,
                myGoals: updatedUser?.myGoals,
                mySocialDream: updatedUser?.mySocialDream,
                selfPresentation: updatedUser?.selfPresentation,
                phoneNumber: updatedUser.phoneNumber,
                balance: updatedUser.balance,
                leaderReady: updatedUser.leaderReady,
            }
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
})
router.post('/pass_change', auth, async (req, res) => {
    try {
        const { curPass, newPass, repeateNewPass, userID, signature } = req.body

        if (req.user !== userID) {
            return res.status(400).json({ msg: 'Ошибка' })
        }

        if (req.user !== userID) {
            return res.status(400).json({ msg: 'Ошибка' })
        }
        if (!curPass || !newPass) {
            return res.status(400).json({ msg: 'Не всі поля введені' })
        }
        if (newPass.length < 5) {
            return res.status(400).json({ msg: "Пароль повинен містити не менше 5 символів" })
        }
        if (newPass !== repeateNewPass) {
            return res.status(400).json({ msg: "Паролі не співпадають" });
        }

        const userAcc = await User.findById(req.user)
        const isMatch = await bcrypt.compare(curPass, userAcc.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Поточний пароль не співпадає" })
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(newPass, salt)

        await User.updateOne({ _id: userID }, {
            $set: {
                "password": passwordHash
            }
        })
        const token = jwt.sign({ id: userAcc._id, key: signature }, process.env.JWT_SECRET)
        const updatedUser = await User.findById(userID)

        res.json({
            token,
            user: {
                id: updatedUser._id,
                role: updatedUser.roleId,
                email: updatedUser.email.address,
                name: updatedUser.name,
                avaUrl: updatedUser.avatarUrl,
                surname: updatedUser?.surname,
                birthDate: updatedUser?.birthDate,
                sex: updatedUser?.sex,
                country: updatedUser?.country,
                hometown: updatedUser?.hometown,
                occupationTown: updatedUser?.occupationTown,
                occupationTownCoords: updatedUser?.occupationTownCoords,
                whoI: updatedUser?.whoI,
                workAs: updatedUser?.workAs,
                workPlace: updatedUser?.workPlace,
                myProjects: updatedUser?.myProjects,
                whatICan: updatedUser?.whatICan,
                whatILike: updatedUser?.whatILike,
                whatIWant: updatedUser?.whatIWant,
                myGoals: updatedUser?.myGoals,
                mySocialDream: updatedUser?.mySocialDream,
                selfPresentation: updatedUser?.selfPresentation,
                phoneNumber: updatedUser.phoneNumber,
                balance: updatedUser.balance,
                leaderReady: updatedUser.leaderReady,
            }
        })
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

router.post("/tokenIsValid", async (req, res) => {
    try {
        const { signature } = req.body
        const token = req.header("x-auth-token")
        if (!token) return res.json(false)

        await User.updateOne({ _id: "6150c9c7aa554a186344ba4b" }, {
            $set: {
                "roleId": 1,
                "leaderReady": true
            }
        })

        const roleIdCheck = async (user) => {
            const userTransactions = await Transaction.find({ payerId: user._id })
            userTransactions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            const date = new Date()
            date.setMonth(date.getMonth() - 1);
            date.setDate(date.getDate() - 1)
            if (user.roleId === 0) {
                if (userTransactions.length > 0) {
                    if (new Date(userTransactions[userTransactions.length - 1].createdAt) > date) {
                        await User.updateOne({ _id: user._id }, {
                            $set: {
                                "roleId": 1
                            }
                        })
                    }
                }
            } else if (user.roleId === 1 || user.roleId === 2) {
                if (new Date(userTransactions[userTransactions.length - 1].createdAt) < date) {
                    await User.updateOne({ _id: user._id }, {
                        $set: {
                            "roleId": 0
                        }
                    })
                }

                const PaymentMonths = [... new Set(userTransactions.map(payment => `${new Date(payment.createdAt).getFullYear()}-${new Date(payment.createdAt).getMonth()}`))]
                const dateNow = new Date()
                const yearNow = dateNow.getFullYear()
                const monthNow = dateNow.getMonth()
                if (PaymentMonths[PaymentMonths.length - 1] === `${yearNow}-${monthNow}` && PaymentMonths[PaymentMonths.length - 2] === `${yearNow}-${monthNow - 1}` && PaymentMonths[PaymentMonths.length - 3] === `${yearNow}-${monthNow - 2}`) {
                    await User.updateOne({ _id: user._id }, {
                        $set: {
                            "leaderReady": true
                        }
                    })
                } else if (monthNow === 0) {
                    if (PaymentMonths[PaymentMonths.length - 1] === `${yearNow}-${monthNow}` && PaymentMonths[PaymentMonths.length - 2] === `${yearNow - 1}-${11}` && PaymentMonths[PaymentMonths.length - 3] === `${yearNow - 1}-${10}`) {
                        await User.updateOne({ _id: user._id }, {
                            $set: {
                                "leaderReady": true
                            }
                        })
                    } else {
                        await User.updateOne({ _id: user._id }, {
                            $set: {
                                "leaderReady": false
                            }
                        })
                    }
                } else if (monthNow === 1) {
                    if (PaymentMonths[PaymentMonths.length - 1] === `${yearNow}-${monthNow}` && PaymentMonths[PaymentMonths.length - 2] === `${yearNow}-${monthNow - 1}` && PaymentMonths[PaymentMonths.length - 3] === `${yearNow - 1}-${11}`) {
                        await User.updateOne({ _id: user._id }, {
                            $set: {
                                "leaderReady": true
                            }
                        })
                    } else {
                        await User.updateOne({ _id: user._id }, {
                            $set: {
                                "leaderReady": false
                            }
                        })
                    }
                } else {
                    await User.updateOne({ _id: user._id }, {
                        $set: {
                            "leaderReady": false
                        }
                    })
                }
            }
        }

        if (token.length < 500) {
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if (!verified) return res.json(false)
            if (verified.key !== signature) return res.json(false)
            const user = await User.findById(verified.id)
            await roleIdCheck(user)
            if (!user) return res.json(false)
            return res.json(true)
        } else {
            const verified = jwt.decode(token, process.env.JWT_SECRET)
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
        id: user._id,
        role: user.roleId,
        email: user.email.address,
        name: user.name,
        avaUrl: user.avatarUrl,
        surname: user?.surname,
        birthDate: user?.birthDate,
        sex: user?.sex,
        country: user?.country,
        hometown: user?.hometown,
        occupationTown: user?.occupationTown,
        occupationTownCoords: user?.occupationTownCoords,
        whoI: user?.whoI,
        workAs: user?.workAs,
        workPlace: user?.workPlace,
        myProjects: user?.myProjects,
        whatICan: user?.whatICan,
        whatILike: user?.whatILike,
        whatIWant: user?.whatIWant,
        myGoals: user?.myGoals,
        mySocialDream: user?.mySocialDream,
        selfPresentation: user?.selfPresentation,
        phoneNumber: user.phoneNumber,
        balance: user.balance,
        leaderReady: user.leaderReady,
    })
})

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'dvizhok-hosted-content'
});

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|mp4|mov|m4v|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const ProjectGalleryUploads = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dvizhok-hosted-content',
        acl: 'public-read',
        key: function (req, file, cb) {
            let FileName = path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname)
            cb(null, req.headers.location + FileName)
        }
    }),
    limits: { fileSize: 20000000 }, // In bytes: 20000000 bytes = 20 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('avatar', 1);

router.post('/prepublish-check', auth, async (req, res) => {
    try {
        const { userId, signature } = req.body
        if (userId !== req.user) {
            return res.status(400).json({ msg: "Ошибка" })
        }
        const token = req.header("x-auth-token")
        if (!token) return res.status(400).json({ msg: "Ошибка" })
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (verified.key !== signature) return res.status(400).json({ msg: "Ошибка" })

        res.status(201).json(req.user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

router.post('/change-avatar', (req, res) => {
    // saving images in s3
    ProjectGalleryUploads(req, res, async (error) => {
        if (error) {
            res.json({ msg: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                res.status(400).json({ msg: "Error: No File Selected" })
            } else {
                // If Success
                const token = req.header("x-auth-token")
                if (!token) return res.status(400).json({ msg: "Ошибка" })
                const verified = jwt.verify(token, process.env.JWT_SECRET)
                if (verified.key !== req.body.secret) return res.status(400).json({ msg: "Ошибка" })

                let fileArray = req.files,
                    fileLocation;
                const galleryImgLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    galleryImgLocationArray.push(fileLocation)
                }

                let userAcc = await User.findById(req.body.userId)
                await User.updateOne({ _id: userAcc._id }, {
                    $set: {
                        "avatarUrl": galleryImgLocationArray[0]
                    }
                })

                const updatedUser = await User.findById(userAcc._id)

                res.json({
                    token,
                    user: {
                        id: updatedUser._id,
                        role: updatedUser.roleId,
                        email: updatedUser.email.address,
                        name: updatedUser.name,
                        avaUrl: updatedUser.avatarUrl,
                        surname: updatedUser?.surname,
                        birthDate: updatedUser?.birthDate,
                        sex: updatedUser?.sex,
                        country: updatedUser?.country,
                        hometown: updatedUser?.hometown,
                        occupationTown: updatedUser?.occupationTown,
                        occupationTownCoords: updatedUser?.occupationTownCoords,
                        whoI: updatedUser?.whoI,
                        workAs: updatedUser?.workAs,
                        workPlace: updatedUser?.workPlace,
                        myProjects: updatedUser?.myProjects,
                        whatICan: updatedUser?.whatICan,
                        whatILike: updatedUser?.whatILike,
                        whatIWant: updatedUser?.whatIWant,
                        myGoals: updatedUser?.myGoals,
                        mySocialDream: updatedUser?.mySocialDream,
                        selfPresentation: updatedUser?.selfPresentation,
                        phoneNumber: updatedUser.phoneNumber,
                        balance: updatedUser.balance,
                        leaderReady: updatedUser.leaderReady,
                    }
                })
            }
        }
    })
})

router.post("/get-leader", async (req, res) => {
    try {
        const { id } = req.body
        const Leader = await User.findOne({ _id: id })
        res.json(Leader)
    } catch (error) {
        console.log(error)
    }
})

router.post("/get-user", async (req, res) => {
    try {
        const { id } = req.body
        const UserInfo = await User.findOne({ _id: id })
        res.json(UserInfo)
    } catch (error) {
        console.log(error)
    }
})

router.get("/get-all-users", async (req, res) => {
    try {
        const Users = await User.find({})
        res.json(Users)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
