const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectleaderName: { type: String, required: true },
    projectleaderId: { type: String, required: true},
    description: { type: String, required: true },
    photosNvideos: { type: Array, required: true },
    category: { type: String, required: true },
    logoUrl: { type: Array, required: true },
    projectName: { type: String, required: true }
})

module.exports = project = mongoose.model("project", projectSchema)
