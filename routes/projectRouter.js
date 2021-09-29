const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const auth = require("../middleware/auth")
const express = require('express')
const router = express();
const jwt = require("jsonwebtoken")

const Project = require("../models/projectModel")
const User = require("../models/userModel")

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'dvizhok-hosted-content'
});

/**
 * Check File Type
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|mp4|mov|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images & Videos Only!');
    }
}
function checkPdfAndXlsType(file, cb) {
    // Allowed ext
    const filetypes = /pdf|xls|xlsx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: PDF, XLS, XLSX Only!');
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
}).array('galleryImage', 5);

const ProjectPDFAndXLSUploads = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dvizhok-hosted-content',
        acl: 'public-read',
        key: function (req, file, cb) {
            let FileName = path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname)
            cb(null, "images/files/pdfAndXlsFiles/" + FileName)
        }
    }),
    limits: { fileSize: 11000000 },
    fileFilter: function (req, file, cb) {
        checkPdfAndXlsType(file, cb);
    }
}).array('filePDFAndXLS', 2);


router.post('/upload-xlsANDpdf', (req, res) => {
    ProjectPDFAndXLSUploads(req, res, (error) => {
        if (error) {
            res.json({ msg: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                res.status(400).json({ msg: "Error: No File Selected" })
            } else {
                // If Success
                let fileArray = req.files,
                    fileLocation;
                const PdfAndXlsLocationArray = []
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    PdfAndXlsLocationArray.push(fileLocation)
                }

                if (req.body.projName.length < 5) {
                    return res.status(400).json({ msg: "Назва проекту має містити принаймні 5 символів" })
                } else if (req.body.projName.includes('/')) {
                    return res.status(400).json({ msg: "Назва проекту не може містити '/'" })
                } else if (req.body.projName.length > 50) {
                    return res.status(400).json({ msg: "Назва проекту має бути меншим за 50 символів" })
                }
                if (req.body.category === "") {
                    return res.status(400).json({ msg: "Будь ласка, виберіть категорію проекту" })
                }
                // change categories here
                if (req.body.category !== "Культура" && req.body.category !== "Екологія") {
                    return res.status(400).json({ msg: "Будь ласка, виберіть категорію проекту" })
                }
                if (!req.body.Location) {
                    return res.status(400).json({ msg: "Введіть місце розташування проекту та виберіть його зі списку" })
                }
                if (req.body.description.length < 25) {
                    return res.status(400).json({ msg: "'Короткий опис' має містити принаймні 25 символів" })
                } else if (req.body.description.length > 300) {
                    return res.status(400).json({ msg: "'Короткий опис' має бути меншим за 300 символів." })
                }
                if (req.body.fundsReqrd === "" && !req.body.isFundsInfinite) {
                    return res.status(400).json({ msg: "Будь ласка, введіть скільки необхідно коштів" })
                }
                if (req.body.fundsReqrd.length > 15) {
                    return res.status(400).json({ msg: "сума необхідних коштів занадто велика" })
                }
                const dateNow1 = new Date()
                const dateFinish = new Date(req.body.finishDate)
                if (dateFinish.getTime() <= dateNow1.getTime()) {
                    return res.status(400).json({ msg: "Будь ласка, введіть правильну дату закінчення проекту" })
                }
                if (req.body.finishDate === "" && !req.body.isProjectInfinite) {
                    return res.status(400).json({ msg: "Будь ласка, введіть дату закінчення проекту" })
                }
                if (req.body.teamMembers.length < 0) {
                    return res.status(400).json({ msg: "Будь ласка, додайте хоча б одного учасника команди проекту" })
                }
                if (req.body.projectRelevance.length < 25) {
                    return res.status(400).json({ msg: "'Актуальність Проекту' має містити принаймні 25 символів" })
                } else if (req.body.projectRelevance.length > 2000) {
                    return res.status(400).json({ msg: "'Актуальність Проекту' має бути меншим за 2000 символів." })
                }
                if (req.body.preHistory.length < 25) {
                    return res.status(400).json({ msg: "'Передісторія' має містити принаймні 25 символів" })
                } else if (req.body.preHistory.length > 2000) {
                    return res.status(400).json({ msg: "'Передісторія' має бути меншим за 2000 символів." })
                }
                if (req.body.projectPlan.length < 25) {
                    return res.status(400).json({ msg: "'План реалізації Проекту' має містити принаймні 25 символів" })
                } else if (req.body.projectPlan.length > 2000) {
                    return res.status(400).json({ msg: "'План реалізації Проекту' має бути меншим за 2000 символів." })
                }
                if (req.body.expectations.length < 25) {
                    return res.status(400).json({ msg: "'Очікування' має містити принаймні 25 символів" })
                } else if (req.body.expectations.length > 2000) {
                    return res.status(400).json({ msg: "'Очікування' має бути меншим за 2000 символів." })
                }
                if (req.body.spendingPlans.length < 25) {
                    return res.status(400).json({ msg: "'Плани витрат' має містити принаймні 25 символів" })
                } else if (req.body.spendingPlans.length > 2000) {
                    return res.status(400).json({ msg: "'Плани витрат' має бути меншим за 2000 символів." })
                }
                const token = req.header("x-auth-token")
                if (!token) return res.status(400).json({ msg: "Ошибка" })
                const verified = jwt.verify(token, process.env.JWT_SECRET)
                if (verified.key !== req.body.secret) return res.status(400).json({ msg: "Ошибка" })


                res.status(201).json(PdfAndXlsLocationArray)
            }
        }
    })
})

router.post('/create-project', (req, res) => {
    // saving images in s3
    ProjectGalleryUploads(req, res, async (error) => {
        if (error) {
            res.json({ msg: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                res.status(400).json({ msg: "Error: No File Selected" })
            } else {
                if (req.body.projName.length < 5) {
                    return res.status(400).json({ msg: "Назва проекту має містити принаймні 5 символів" })
                } else if (req.body.projName.includes('/')) {
                    return res.status(400).json({ msg: "Назва проекту не може містити '/'" })
                } else if (req.body.projName.length > 50) {
                    return res.status(400).json({ msg: "Назва проекту має бути меншим за 50 символів" })
                }
                if (req.body.category === "") {
                    return res.status(400).json({ msg: "Будь ласка, виберіть категорію проекту" })
                }
                // change categories here
                if (req.body.category !== "Культура" && req.body.category !== "Екологія") {
                    return res.status(400).json({ msg: "Будь ласка, виберіть категорію проекту" })
                }
                if (!req.body.Location) {
                    return res.status(400).json({ msg: "Введіть місце розташування проекту та виберіть його зі списку" })
                }
                if (req.body.description.length < 25) {
                    return res.status(400).json({ msg: "'Короткий опис' має містити принаймні 25 символів" })
                } else if (req.body.description.length > 300) {
                    return res.status(400).json({ msg: "'Короткий опис' має бути меншим за 300 символів." })
                }
                if (req.body.fundsReqrd === "" && !req.body.isFundsInfinite) {
                    return res.status(400).json({ msg: "Будь ласка, введіть скільки необхідно коштів" })
                }
                if (req.body.fundsReqrd.length > 15) {
                    return res.status(400).json({ msg: "сума необхідних коштів занадто велика" })
                }
                const dateNow1 = new Date()
                const dateFinish = new Date(req.body.finishDate)
                if (dateFinish.getTime() <= dateNow1.getTime()) {
                    return res.status(400).json({ msg: "Будь ласка, введіть правильну дату закінчення проекту" })
                }
                if (req.body.finishDate === "" && !req.body.isProjectInfinite) {
                    return res.status(400).json({ msg: "Будь ласка, введіть дату закінчення проекту" })
                }
                if (req.body.teamMembers.length < 0) {
                    return res.status(400).json({ msg: "Будь ласка, додайте хоча б одного учасника команди проекту" })
                }
                if (req.body.projectRelevance.length < 25) {
                    return res.status(400).json({ msg: "'Актуальність Проекту' має містити принаймні 25 символів" })
                } else if (req.body.projectRelevance.length > 2000) {
                    return res.status(400).json({ msg: "'Актуальність Проекту' має бути меншим за 2000 символів." })
                }
                if (req.body.preHistory.length < 25) {
                    return res.status(400).json({ msg: "'Передісторія' має містити принаймні 25 символів" })
                } else if (req.body.preHistory.length > 2000) {
                    return res.status(400).json({ msg: "'Передісторія' має бути меншим за 2000 символів." })
                }
                if (req.body.projectPlan.length < 25) {
                    return res.status(400).json({ msg: "'План реалізації Проекту' має містити принаймні 25 символів" })
                } else if (req.body.projectPlan.length > 2000) {
                    return res.status(400).json({ msg: "'План реалізації Проекту' має бути меншим за 2000 символів." })
                }
                if (req.body.expectations.length < 25) {
                    return res.status(400).json({ msg: "'Очікування' має містити принаймні 25 символів" })
                } else if (req.body.expectations.length > 2000) {
                    return res.status(400).json({ msg: "'Очікування' має бути меншим за 2000 символів." })
                }
                if (req.body.spendingPlans.length < 25) {
                    return res.status(400).json({ msg: "'Плани витрат' має містити принаймні 25 символів" })
                } else if (req.body.spendingPlans.length > 2000) {
                    return res.status(400).json({ msg: "'Плани витрат' має бути меншим за 2000 символів." })
                }
                const token = req.header("x-auth-token")
                if (!token) return res.status(400).json({ msg: "Ошибка" })
                const verified = jwt.verify(token, process.env.JWT_SECRET)
                if (verified.key !== req.body.secret) return res.status(400).json({ msg: "Ошибка" })

                // If Success
                let fileArray = req.files,
                    fileLocation;
                const galleryImgLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    galleryImgLocationArray.push(fileLocation)
                }
                // last image in array is the logo
                const logo = galleryImgLocationArray.splice(-1)
                let latNlng = req.body.Location.split(',').map(Number)
                const teamMemeberIds = req.body.teamMembers.split(",")

                const files_pdf_xls = req.body.XlsAndPdfFilesLocations.split(',')
                // save proj in mongodb
                const newProj = new Project({
                    projectleaderName: req.body.userName,
                    projectleaderId: req.body.userId,
                    description: req.body.description,
                    photosNvideos: galleryImgLocationArray,
                    category: req.body.category,
                    location: latNlng,
                    locationString: req.body.locationString,
                    logoUrl: logo,
                    projectName: req.body.projName,
                    filePDF: files_pdf_xls[0],
                    fileXLS: files_pdf_xls[1],
                    spendingPlans: req.body.spendingPlans,
                    expectations: req.body.expectations,
                    projectPlan: req.body.projectPlan,
                    preHistory: req.body.preHistory,
                    projectRelevance: req.body.projectRelevance,
                    teamMembers: teamMemeberIds,
                    isFundsInfinite: req.body.isFundsInfinite,
                    isProjectInfinite: req.body.isProjectInfinite,
                    fundsReqrd: req.body.fundsReqrd,
                    finishDate: req.body.finishDate,
                    followers: [req.body.userId],
                })

                const savedProject = await newProj.save()
                console.log('1', savedProject)
                res.json(savedProject);
            }
        }
    })
})

router.get("/get-my-projects", auth, async (req, res) => {
    const allMyProjects = await Project.find({ projectleaderId: req.user })
    res.json(allMyProjects)
})
router.get("/get-all-projects", async (req, res) => {
    const allProjects = await Project.find({})
    res.json(allProjects)
})
router.post("/get-exact-projects", async (req, res) => {
    try {
        const { id } = req.body
        const exactProject = await Project.find({ _id: id })
        res.json(exactProject)
    } catch (error) {
        console.log(error)
    }
})
router.post("/get-created-projects-by-user", async (req, res) => {
    try {
        const { id } = req.body
        const CreatedProjects = await Project.find({ projectleaderId: id })
        res.json(CreatedProjects)
    } catch (error) {
        console.log(error)
    }
})
router.post("/get-user-took-a-part", async (req, res) => {
    try {
        const { id } = req.body
        const TookAPartProjects = await Project.find({ teamMembers: { $all: [id] } })
        res.json(TookAPartProjects)
    } catch (error) {
        console.log(error)
    }
})
router.post("/get-supported-projects", async (req, res) => {
    try {
        const { id } = req.body
        const SupportedProjects = await Project.find({ helpers: { $all: [id] } })
        res.json(SupportedProjects)
    } catch (error) {
        console.log(error)
    }
})
router.post("/raise", async (req, res) => {
    try {
        const { amount, userId, projectId, signature } = req.body
        const token = req.header("x-auth-token")
        if (!token) return res.status(400).json({ msg: "No token" });
        if (token.length < 500) {
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if (!verified) return res.status(400).json({ msg: "An error occurred" });
            if (verified.key !== signature) return res.status(400).json({ msg: "An error occurred" });
        } else {
            // for the google auth in future
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if (!verified) return res.status(400).json({ msg: "An error occurred" });
            if (verified.key !== signature) return res.status(400).json({ msg: "An error occurred" });
        }
        let userInfo = await User.findById(userId)
        if (userInfo.balance < amount) return res.status(400).json({ msg: "An error occurred" });

        let projectInfo = await Project.findById(projectId)
        let helpersArr = projectInfo.helpers
        if (!projectInfo.helpers.includes(userId)) {
            helpersArr.push(userId)
        }
        await User.updateOne({ _id: userId }, {
            $set: {
                "balance": userInfo.balance - amount,
            }
        })
        userInfo = await User.findById(userId)
        await Project.updateOne({ _id: projectId }, {
            $set: {
                "raised": Number(projectInfo.raised) + Number(amount),
                "helpers": helpersArr,
            }
        })
        res.json({
            token,
            user: {
                id: userInfo._id,
                role: userInfo.roleId,
                email: userInfo.email.address,
                name: userInfo.name,
                avaUrl: userInfo.avatarUrl,
                surname: userInfo?.surname,
                birthDate: userInfo?.birthDate,
                sex: userInfo?.sex,
                country: userInfo?.country,
                hometown: userInfo?.hometown,
                occupationTown: userInfo?.occupationTown,
                whoI: userInfo?.whoI,
                workAs: userInfo?.workAs,
                workPlace: userInfo?.workPlace,
                myProjects: userInfo?.myProjects,
                whatICan: userInfo?.whatICan,
                whatILike: userInfo?.whatILike,
                whatIWant: userInfo?.whatIWant,
                myGoals: userInfo?.myGoals,
                mySocialDream: userInfo?.mySocialDream,
                selfPresentation: userInfo?.selfPresentation,
                phoneNumber: userInfo.phoneNumber,
                balance: userInfo.balance,
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;