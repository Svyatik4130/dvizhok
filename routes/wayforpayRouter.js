const router = require("express").Router()
const axios = require('axios')
const crypto = require('crypto')

router.post("/create-potential-invoice", async (req, res) => {
    try {
        const date = Math.floor(new Date().getTime() / 1000)
        let data = `freelance_user_6138863bab744;www.madrket.ua;${date.toString()};1415379863;0.36;UAH;Процессор;1;0.36`
        // let data = "freelance_user_613ca7aae2a68;www.madrket.ua;DH343448702;1415379863;0.36;UAH;Процессор Intel Core i5-4670 3.4GHz;Память Kingston DDR3-1600 4096MB PC3-12800;1;1;1000;547.36"
        var hmac = crypto.createHmac('md5', process.env.MERCHANT_SECRET_KEY)
        hmac.update(data)
        gen_hmac = hmac.digest('hex')
        console.log(gen_hmac)
        const params = {
            "transactionType": "CREATE_INVOICE",
            "merchantAccount": "freelance_user_6138863bab744",
            "merchantAuthType": "SimpleSignature",
            "merchantDomainName": "www.madrket.ua",
            "merchantSignature": gen_hmac,
            "apiVersion": 1,
            "language": "ru",
            "orderReference": date.toString(),
            "orderDate": 1415379863,
            "amount": 0.36,
            "currency": "UAH",
            "orderTimeout": 86400,
            "productName": ["Процессор"],
            "productPrice": [0.36],
            "productCount": [1],
            "clientEmail": "appletrollface@gmail.com",
            "clientPhone": "380556667788"
        }
        const resWayForPay = await axios.post("https://api.wayforpay.com/api", params)
        res.json(resWayForPay.data);

    } catch (error) {
        console.log(error)
    }
})

module.exports = router