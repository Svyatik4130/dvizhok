const router = require("express").Router();
const Notification = require("../models/notificationModel");
const auth = require("../middleware/auth")

router.post('/add', async (req, res) => {
    const { receiverId, type, text, link } = req.body

    if (text.length < 2 || text.length > 300) {
        return res.status(400).json({ msg: `Довжина тексту новини повинна бути від 2 до 300 символів. Зараз:${text.length}` })
    }

    if (type !== "new_dm", type !== "new_support") {
        return res.status(400).json({ msg: `type error` })
    }

    const newNotifiaction = new Notification({
        receiverId,
        type,
        text,
        link,
        isViewed: false
    })

    const savedNotification = await newNotifiaction.save()
    res.json(savedNotification);
})

router.post('/add-multiple', async (req, res) => {
    const { receiverIds, type, text, link, myId } = req.body

    if (text.length < 2 || text.length > 200) {
        return res.status(400).json({ msg: `Довжина тексту новини повинна бути від 2 до 200 символів. Зараз:${text.length}` })
    }

    if (type !== "new_news", type !== "new_support") {
        return res.status(400).json({ msg: `type error` })
    }
    await receiverIds.map(async (id) => {
        let newNotification = {}
        if (link) {
            newNotification = new Notification({
                receiverId: id,
                type,
                text,
                link,
                isViewed: false
            })
        } else {
            newNotification = new Notification({
                receiverId: id,
                type,
                text,
                isViewed: false
            })
        }
        await newNotification.save()
    })
    const allMyNotifications = await Notification.find({ receiverId: myId.toString() })
    res.json(allMyNotifications)
})

router.get('/get-my-notifications', auth, async (req, res) => {
    const allMyNotifications = await Notification.find({ receiverId: req.user.toString() })
    res.json(allMyNotifications)
})

router.post('/read-dm', auth, async (req, res) => {
    const { url } = req.body
    await Notification.updateMany(
        { "link": url, "receiverId": req.user.toString() },
        { "isViewed": true }
    )
    const allMyNotifications = await Notification.find({ receiverId: req.user.toString() })
    res.json(allMyNotifications)
})

router.get('/read-news', auth, async (req, res) => {
    await Notification.updateMany(
        { "type": "new_news", "receiverId": req.user.toString() },
        { "isViewed": true }
    )
    const allMyNotifications = await Notification.find({ receiverId: req.user.toString() })
    res.json(allMyNotifications)
})

router.post('/read-supports', auth, async (req, res) => {
    const { url } = req.body
    await Notification.updateMany(
        { "link": url, "receiverId": req.user.toString() },
        { "isViewed": true }
    )
    const allMyNotifications = await Notification.find({ receiverId: req.user.toString() })
    res.json(allMyNotifications)
})

module.exports = router;