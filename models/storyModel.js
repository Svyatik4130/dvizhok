const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
    {
        projectId: { type: String, required: true },
        projectLogo: { type: String, required: true },
        projectName: { type: String, required: true },
        publisherId: { type: String, required: true },
        storyType: { type: String, required: true },
        text: { type: String, required: true },
        photosNvideos: { type: Array },
        likedIds: { type: Array },
        location: { type: Array, required: true },
        locationString: { type: String, required: true },
        announcementName: { type: String },
        finishDate: { type: String },
        startDate: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);