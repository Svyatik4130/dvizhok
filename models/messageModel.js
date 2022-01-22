
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: String },
        sender: { type: String },
        text: { type: String },
        userAvatar: { type: String },
        userName: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);