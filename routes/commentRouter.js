const router = require("express").Router();
const Comment = require("../models/commentsModel");

//add

router.post("/add", async (req, res) => {
    const newComment = new Comment(req.body);

    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get

router.get("/:advrtId", async (req, res) => {
    try {
        const comment = await Comment.find({
            advrtId: req.params.advrtId,
        });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;