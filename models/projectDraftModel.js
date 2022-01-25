const mongoose = require("mongoose")

const projectDraftSchema = new mongoose.Schema({
    projectleaderName: { type: String },
    projectleaderId: { type: String },
    description: { type: String },
    photosNvideos: { type: Array },
    category: { type: Array },
    logoUrl: { type: Array },
    projectName: { type: String },
    filePDF: { type: String, },
    fileXLS: { type: String, },
    spendingPlans: { type: String },
    expectations: { type: String },
    projectPlan: { type: String },
    preHistory: { type: String },
    projectRelevance: { type: String },
    teamMembers: { type: Array },
    isFundsInfinite: { type: Boolean },
    isProjectInfinite: { type: Boolean },
    fundsReqrd: { type: String, },
    finishDate: { type: String, },
    location: {type: Array},
    locationString: {type: String},
    followers: { type: Array, default: [] },
    helpers: { type: Array, default: [] },
    raised: { type: Number, default: 0 },
},
    { timestamps: true }
)

module.exports = projectDraft = mongoose.model("projectDraft", projectDraftSchema)
