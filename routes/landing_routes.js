require("dotenv").config()

const router = require("express").Router()
const nodemailer = require('nodemailer');

router.post("/sendemail", async (req, res) => {

    const { name, phone, email, message } = req.body

    if(name.length < 1) {
        return res.status(400).json({ msg: "Please, enter your name" })
    }
    if(phone.length <= 9) {
        return res.status(400).json({ msg: "Please, enter your phone" })
    }
    if(!email.includes("@")) {
        return res.status(400).json({ msg: "Please, enter your email properly" })
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'appletrollface@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'appletrollface@gmail.com',
        to: email,
        subject: `Hello, ${name}, we have received your message.`,
        html: `
        <div style="text-align: center;">
        <img src="https://dvizhok.herokuapp.com/images/bigLogo.png" style="margin: auto; width: 244px;">
        <h2><b>Dear, ${name}</b></h2>
        ${message.length > 1 ? `<h4>We have received your message: ${message}</h4>` : ``}
        <h4>We will call you as soon as it possible at number: ${phone} </h4>
        </div>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('err')
            console.log(error);
        } else {
            console.log('success')
            console.log('Email sent: ' + info.response);
            res.json(true)
        }
    });
})


module.exports = router
