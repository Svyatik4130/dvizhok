const router = require("express").Router()
const axios = require('axios')
const crypto = require('crypto')

const Transaction = require("../models/transactionModel")
const User = require("../models/userModel")
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

router.post("/create-potential-invoice", async (req, res) => {
    try {
        let { userId, amount, email, phone } = req.body
        amount = 1
        // if (amount < 100) {
        //     return res.status(400).json({ msg: "Введіть коректну суму поповнення(більше 100 грн)" })
        // }

        const date = Math.floor(new Date().getTime() / 1000)
        const orderName = `${userId}-${date}`
        let data = `freelance_user_6138863bab744;https://dvizhok.herokuapp.com;${orderName};${date};${amount};UAH;Поповнення внутрішнього балансу Dvizhok;1;${amount}`
        var hmac = crypto.createHmac('md5', process.env.MERCHANT_SECRET_KEY)
        hmac.update(data)
        gen_hmac = hmac.digest('hex')
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

                let message = {}
                let CnvId = ""
                const newConversation = new Conversation({
                    members: [payerId, "6150c9c7aa554a186344ba4b"],
                });
                const isConversationUnique = await Conversation.findOne({ members: { $all: [payerId, "6150c9c7aa554a186344ba4b"] } })
                if (isConversationUnique) {
                    CnvId = isConversationUnique._id
                } else {
                    const savedConversation = await newConversation.save();
                    CnvId = savedConversation._id
                }

                const dateInMonth = new Date()
                dateInMonth.setMonth(dateInMonth.getMonth() + 1)

                if (payerUser.roleId === 0) {
                    message = {
                        sender: "6150c9c7aa554a186344ba4b",
                        text: `Вітаємо! Ви стали Творцем! Поповнення на ${requestObject.products.price}грн. Наступне поповнення потенціалу - ${dateInMonth.getFullYear()}/${dateInMonth.getMonth()}/${dateInMonth.getDate()}`,
                        conversationId: CnvId,
                    };
                } else {
                    message = {
                        sender: "6150c9c7aa554a186344ba4b",
                        text: `Вітаємо! Ви поповнили свій потенціал на ${requestObject.products.price}грн і продовжуєте бути Творцем! Мершій обирайте проекти для підтримки!`,
                        conversationId: CnvId,
                    };
                }

                const newMessage = new Message(message);
                await newMessage.save();

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

router.get("/get-last-transaction/:userId", async (req, res) => {
    try {
        const lastTransaction = await Transaction.find({ payerId: req.params.userId })
        res.json(lastTransaction[lastTransaction.length - 1])
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
