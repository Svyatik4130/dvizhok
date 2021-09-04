const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectleaderName: { type: String, required: true },
    projectleaderId: { type: String, required: true },
    description: { type: String, required: true },
    photosNvideos: { type: Array, required: true },
    category: { type: Array, required: true },
    logoUrl: { type: Array, required: true },
    projectName: { type: String, required: true },
    filePDF: { type: String, },
    fileXLS: { type: String, },
    spendingPlans: { type: String, required: true },
    expectations: { type: String, required: true },
    projectPlan: { type: String, required: true },
    preHistory: { type: String, required: true },
    projectRelevance: { type: String, required: true },
    teamMembers: { type: Array, required: true },
    isFundsInfinite: { type: Boolean, required: true },
    isProjectInfinite: { type: Boolean, required: true },
    fundsReqrd: { type: String, },
    finishDate: { type: String, },
    location: {type: Array}
},
    { timestamps: true }
)

module.exports = project = mongoose.model("project", projectSchema)
