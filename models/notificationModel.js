
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
    {
        receiverId: { type: String, required: true },
        type: { type: String, required: true },
        text: { type: String, required: true },
        link: { type: String },
        isViewed: { type: Boolean, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);