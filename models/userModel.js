const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: Object, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: Number, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, required: true, default: "https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/+no_photo_user.png" },
    surname: { type: String, required: true },
    birthDate: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    sex: { type: Array, default: [""] },
    country: { type: String, default: "" },
    hometown: { type: String, default: "" },
    occupationTown: { type: String, default: "" },
    whoI: { type: String, default: "" },
    workAs: { type: String, default: "" },
    workPlace: { type: String, default: "" },
    myProjects: { type: Array, default: [''] },
    whatICan: { type: String, default: "" },
    whatILike: { type: String, default: "" },
    whatIWant: { type: String, default: "" },
    myGoals: { type: String, default: "" },
    mySocialDream: { type: String, default: "" },
    selfPresentation: { type: String, default: "" },
    phoneNumber: { type: Array, required: true },
    leaderReady: { type: Boolean, required: true, default: false },
}, { timestamps: true })

module.exports = user = mongoose.model("user", userSchema)
