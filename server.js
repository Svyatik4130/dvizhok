const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const path = require('path');

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5040

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err; 
    console.log("MONGODB CONNECTED")
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build/index.html"))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html')) // important for 404!!!
    })
}

app.listen(PORT, () => console.log(`the server started at ${PORT}`))
