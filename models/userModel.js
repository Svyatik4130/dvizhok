const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: Object, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true }
})

module.exports = user = mongoose.model("user", userSchema)
