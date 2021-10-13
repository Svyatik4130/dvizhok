const router = require("express").Router()
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken")

const Story = require("../models/storyModel")
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'dvizhok-hosted-content'
});

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

const StoryGalleryUploads = multer({
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
}).array('galleryImage', 4);

router.post('/create-story', (req, res) => {

    // saving images in s3
    StoryGalleryUploads(req, res, async (error) => {
        if (error) {
            res.json({ msg: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                res.status(400).json({ msg: "Error: No File Selected" })
            } else {
                // If Success
                console.log("good")
                if (req.body.text.length < 5) {
                    return res.status(400).json({ msg: `Довжина тексту новини повинна бути від 5 до 1000 символів. Зараз:${desc.length}` })
                }
                if (!req.body.locationString || !req.body.location) {
                    return res.status(400).json({ msg: `Введіть локацію новиниfff` })
                }

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

                // last image in array is the logo
                let latNlng = req.body.location.split(',').map(Number)

                // save proj in mongodb
                const newStory = new Story({
                    projectId: req.body.projectId,
                    projectLogo: req.body.projectLogo,
                    projectName: req.body.projectName,
                    publisherId: req.body.publisherId,
                    storyType: req.body.storyType,
                    text: req.body.text,
                    photosNvideos: galleryImgLocationArray,
                    location: latNlng,
                    locationString: req.body.locationString,
                })


                const savedStory = await newStory.save()
                res.json(savedStory);
            }
        }
    })
})

module.exports = router
