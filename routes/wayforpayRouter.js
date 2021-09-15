const router = require("express").Router()
const axios = require('axios')
const crypto = require('crypto')
const qs = require('querystring')

router.post("/create-potential-invoice", async (req, res) => {
    try {
        const date = Math.floor(new Date().getTime() / 1000)
        let data = `freelance_user_6138863bab744;https://dvizhok.herokuapp.com;${date.toString()};1415379863;1;UAH;Процессор;1;1`
        // let data = "freelance_user_613ca7aae2a68;www.madrket.ua;DH343448702;1415379863;0.36;UAH;Процессор Intel Core i5-4670 3.4GHz;Память Kingston DDR3-1600 4096MB PC3-12800;1;1;1000;547.36"
        var hmac = crypto.createHmac('md5', process.env.MERCHANT_SECRET_KEY)
        hmac.update(data)
        gen_hmac = hmac.digest('hex')
        console.log(gen_hmac)
        const params = {
            "transactionType": "CREATE_INVOICE",
            "merchantAccount": "freelance_user_6138863bab744",
            "merchantAuthType": "SimpleSignature",
            "merchantDomainName": "https://dvizhok.herokuapp.com",
            "merchantSignature": gen_hmac,
            "apiVersion": 1,
            "language": "ru",
            "orderReference": date.toString(),
            "orderDate": 1415379863,
            "amount": 1,
            "currency": "UAH",
            "serviceUrl": "https://dvizhok.herokuapp.com/payments/get-invoice-response",
            "orderTimeout": 86400,
            "productName": ["Процессор"],
            "productPrice": [1],
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
let test = []

router.post("/get-invoice-response", async (req, res) => {
    console.log(req.body)
    // const formatedString = req.body.replace(":':", ':').replace("}': ''", "")
    // console.log(formatedString)
    // const obj = JSON.parse(formatedString)
    // test.push(obj)
    const firstKey = Object.keys(req.body)[0];
    const firstProduct = Object.keys(req.body[firstKey])[0];
    const str = `${firstKey}${firstProduct}}`
    console.log("hold on hold om hold on", firstKey)
    console.log("whhhaaaaaaaat", firstProduct)
    console.log("whhhaaaaaaaat1212121111111", typeof str)
    const requestObject = JSON.parse(str)
    console.log("string: 1", requestObject)
    res.json(req.body)
})

router.post("/test", async (req, res) => {
    const testresponse = await axios.post("https://dvizhok.herokuapp.com/payments/get-invoice-response", req.body)
    console.log(testresponse.data)
    res.json(test)
})

module.exports = router
