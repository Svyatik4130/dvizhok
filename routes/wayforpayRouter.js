const router = require("express").Router()
const axios = require('axios')
const crypto = require('crypto')

const Transaction = require("../models/transactionModel")
const User = require("../models/userModel")

router.post("/create-potential-invoice", async (req, res) => {
    try {
        const { userId, amount, email, phone } = req.body
        const date = Math.floor(new Date().getTime() / 1000)
        const orderName = `${userId}-${date}`
        let data = `freelance_user_6138863bab744;https://dvizhok.herokuapp.com;${orderName};${date};1;UAH;Поповнення внутрішнього балансу Dvizhok;1;${amount}`
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
            "orderReference": orderName,
            "orderDate": date,
            "amount": amount,
            "currency": "UAH",
            // change url Here after posting on new hosting!!!
            "serviceUrl": "https://dvizhok.herokuapp.com/payments/get-invoice-response",
            "orderTimeout": 86400,
            "productName": ["Поповнення внутрішнього балансу Dvizhok"],
            "productPrice": [amount],
            "productCount": [1],
            "clientEmail": email,
            "clientPhone": phone
        }
        const resWayForPay = await axios.post("https://api.wayforpay.com/api", params)
        res.json(resWayForPay.data);
    } catch (error) {
        console.log(error)
    }
})

router.post("/get-invoice-response", async (req, res) => {
    const date = Math.floor(new Date().getTime() / 1000)

    const firstKey = Object.keys(req.body)[0];
    const firstProduct = Object.keys(req.body[firstKey])[0];
    const str = `${firstKey}${firstProduct}}`
    const requestObject = JSON.parse(str)

    const data = `${requestObject.orderReference};accept;${date}`
    var hmac = crypto.createHmac('md5', process.env.MERCHANT_SECRET_KEY)
    hmac.update(data)
    gen_hmac = hmac.digest('hex')

    const payerId = requestObject.orderReference.split("-")[0]
    console.log(requestObject)
    if (requestObject.transactionStatus === "Approved") {
        const duplicateTransaction = await Transaction.findOne({ "orderName": requestObject.orderReference })
        if (!duplicateTransaction) {
            try {
                const payerUser = await User.findById(payerId)
                const newBalance = Number(payerUser.balance) + Number(requestObject.products.price)
                const newTrans = new Transaction({
                    orderName: requestObject.orderReference,
                    payerId,
                    amount: requestObject.products.price,
                })

                await newTrans.save()

                await User.updateOne({ _id: payerId }, {
                    $set: {
                        "balance": newBalance,
                    }
                })

                const resObject = {
                    "orderReference": requestObject.orderReference,
                    "status": "accept",
                    "time": date,
                    "signature": gen_hmac
                }
                res.json(resObject)
            } catch (error) {
                console.log(error)
                res.json(error)
            }
        }
    } else if (requestObject.transactionStatus === "Refunded") {
        try {
            const payerUser = await User.findById(payerId)
            const newBalance = Number(payerUser.balance) - Number(requestObject.products.price)
            await User.updateOne({ _id: payerId }, {
                $set: {
                    "balance": newBalance,
                }
            })

            const resObject = {
                "orderReference": requestObject.orderReference,
                "status": "accept",
                "time": date,
                "signature": gen_hmac
            }
            res.json(resObject)
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
})

module.exports = router
