const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        advrtId: { type: String },
        senderId: { type: String },
        text: { type: String },
        userName: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);