const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const auth = require("../middleware/auth")
const express = require('express')
const router = express();

const Project = require("../models/projectModel")

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
    const filetypes = /jpeg|jpg|mp4|mov|m4v|png/;
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
function checkPdfType(file, cb) {
    // Allowed ext
    const filetypes = /pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: PDF Only!');
    }
}
function checkXlsType(file, cb) {
    // Allowed ext
    const filetypes = /xls/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: PDF Only!');
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

const ProjectPDFUploads = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dvizhok-hosted-content',
        acl: 'public-read',
        key: function (req, file, cb) {
            let FileName = path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname)
            cb(null, req.headers.locationForPdf + FileName)
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkPdfType(file, cb);
    }
}).array('filePDF', 1);

const ProjectXLSUploads = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dvizhok-hosted-content',
        acl: 'public-read',
        key: function (req, file, cb) {
            let FileName = path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname)
            cb(null, req.headers.locationForXls + FileName)
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkXlsType(file, cb);
    }
}).array('fileXLS', 1);



router.post('/prepublish-check', auth, async (req, res) => {
    try {
        const { selections, userId, } = req.body
        console.log(req.body)
        let areSelectionsCorrect = true
        selections.forEach(selection => {
            // add new categories here
            if (selection !== "Культура" && selection !== "Екологія") {
                areSelectionsCorrect = false
            }
        });
        if (!areSelectionsCorrect) {
            return res.status(400).json({ msg: "Не треба так))))" })
        }
        console.log(userId !== req.user)
        if (userId !== req.user) {
            return res.status(400).json({ msg: "Ошибка" })
        }

        res.status(201).json(req.user)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
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

                // save proj in mongodb
                const newProj = new Project({
                    projectleaderName: req.body.userName,
                    projectleaderId: req.body.userId,
                    description: req.body.description,
                    photosNvideos: galleryImgLocationArray,
                    category: req.body.selections,
                    logoUrl: logo,
                    projectName: req.body.projName,
                    filePDF: req.body.filePDF,
                    fileXLS: req.body.fileXLS,
                    spendingPlans: req.body.spendingPlans,
                    expectations: req.body.expectations,
                    projectPlan: req.body.projectPlan,
                    preHistory: req.body.preHistory,
                    projectRelevance: req.body.projectRelevance,
                    teamMembers: req.body.teamMembers,
                    isFundsInfinite: req.body.isFundsInfinite,
                    isProjectInfinite: req.body.isProjectInfinite,
                    fundsReqrd: req.body.fundsReqrd,
                    finishDate: req.body.finishDate,
                })
                console.log(newProj)

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

module.exports = router;