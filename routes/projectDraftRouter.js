const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const auth = require("../middleware/auth")
const express = require('express')
const router = express();
const jwt = require("jsonwebtoken")

const Project = require("../models/projectModel")
const ProjectDraft = require("../models/projectDraftModel")

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
    ProjectPDFAndXLSUploads(req, res, async (error) => {
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

                let logo = ""
                if (req.body.isLogo == "true") {
                    // last image in array is the logo
                    logo = galleryImgLocationArray.splice(-1)
                }

                let latNlng = ["", ""]
                if (req.body.Location) {
                    latNlng = req.body.Location.split(',').map(Number)
                }

                let teamMemeberIds = []
                if (req.body.teamMembers.length > 0) {
                    teamMemeberIds = req.body.teamMembers.split(",")
                }

                let arrCtgr = ""
                if (req.body.category) {
                    arrCtgr = req.body.category.split(",")
                }
                let files_pdf_xls = []
                if (req.body.XlsAndPdfFilesLocations) {
                    files_pdf_xls = req.body.XlsAndPdfFilesLocations.split(',')
                }
                // save proj in mongodb
                const newProjDraft = new ProjectDraft({
                    projectleaderName: req.body.userName,
                    projectleaderId: req.body.userId,
                    description: req.body.description,
                    photosNvideos: galleryImgLocationArray,
                    category: arrCtgr,
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
                await ProjectDraft.deleteMany({ "projectleaderId": req.body.userId })

                const savedProjectDraft = await newProjDraft.save()
                res.json(savedProjectDraft);
            }
        }
    })
})
router.post('/create-project-nophoto', async (req, res) => {
    const { description, projName, userName, userId, category, Location, locationString, spendingPlans, expectations, projectPlan, preHistory, projectRelevance, teamMembers, isFundsInfinite, isProjectInfinite, fundsReqrd, finishDate, XlsAndPdfFilesLocations, logoUrl, imageVidUrls } = req.body

    // let latNlng = ["", ""]
    // if (Location) {
    //     latNlng = Location.split(',').map(Number)
    // }

    // let teamMemeberIds = []
    // if (teamMembers.length > 0) {
    //     teamMemeberIds = teamMembers.split(",")
    // }
console.log(Location);
    const files_pdf_xls = XlsAndPdfFilesLocations.split(',')
    // save proj in mongodb
    const newProjDraft = new ProjectDraft({
        projectleaderName: userName,
        projectleaderId: userId,
        description: description,
        photosNvideos: imageVidUrls,
        category: category,
        location: Location,
        locationString: locationString,
        logoUrl: logoUrl,
        projectName: projName,
        filePDF: files_pdf_xls[0],
        fileXLS: files_pdf_xls[1],
        spendingPlans: spendingPlans,
        expectations: expectations,
        projectPlan: projectPlan,
        preHistory: preHistory,
        projectRelevance: projectRelevance,
        teamMembers: teamMembers,
        isFundsInfinite: isFundsInfinite,
        isProjectInfinite: isProjectInfinite,
        fundsReqrd: fundsReqrd,
        finishDate: finishDate,
        followers: [userId],
    })
    await ProjectDraft.deleteMany({ "projectleaderId": req.body.userId })

    const savedProjectDraft = await newProjDraft.save()
    res.json(savedProjectDraft);
})
router.get("/get-my-draft/:userID", async (req, res) => {
    try {
        const Draft = await ProjectDraft.find({
            projectleaderId: req.params.userID,
        });
        res.status(200).json(Draft);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;