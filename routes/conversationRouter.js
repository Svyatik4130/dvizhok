const router = require("express").Router();
const Conversation = require("../models/conversationModel");

//new conv

router.post("/add", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const isConversationUnique = await Conversation.findOne({ members: { $all: [req.body.senderId, req.body.receiverId] } })
        if (isConversationUnique) {
            res.status(200).json(isConversationUnique);
        } else {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

// get conv by id

router.get("/find-by-id/:id", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({ _id: req.params.id });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
