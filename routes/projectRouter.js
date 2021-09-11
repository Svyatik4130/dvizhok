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

                console.log(req.body)
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

module.exports = router;