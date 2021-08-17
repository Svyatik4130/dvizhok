const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: Object, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    avatarUrl: { type: String, required: true, default: "https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/+no_photo_user.png" },
})

module.exports = user = mongoose.model("user", userSchema)
