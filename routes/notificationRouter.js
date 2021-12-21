const router = require("express").Router();
const Notification = require("../models/notificationModel");
const auth = require("../middleware/auth")

router.post('/add', async (req, res) => {
    const { receiverId, type, text, link } = req.body

    if (text.length < 2 || text.length > 50) {
        return res.status(400).json({ msg: `Довжина тексту новини повинна бути від 2 до 50 символів. Зараз:${text.length}` })
    }

    if (type !== "new_dm") {
        return res.status(400).json({ msg: `error` })
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



module.exports = router;