const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const path = require('path');
const passport = require("passport");
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.bodyParser({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const PORT = process.env.PORT || 5040

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MONGODB CONNECTED")
})

app.use("/users", require("./routes/userRouter"))
app.use("/landing", require("./routes/landingRouter"))
app.use("/project", require("./routes/projectRouter"))
app.use("/projectDraft", require("./routes/projectDraftRouter"))
app.use("/conversations", require("./routes/conversationRouter"))
app.use("/messages", require("./routes/messageRouter"))
app.use("/payments", require("./routes/wayforpayRouter"))
app.use("/story", require("./routes/storyRouter"))
app.use("/comments", require("./routes/commentRouter"))
app.use("/notifications", require("./routes/notificationRouter"))



// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html')) // important for 404!!!
    })
}

const server = require('http').Server(app)
var io = require("socket.io")(server, {
    cors: {
        origins: ["*"],
    }
});
console.log("socket io started")
let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    // console.log(socket.id + " connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text, createdAt }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
            createdAt
        });
    });

    //send and get message from projects
    socket.on("sendMessageToProjects", ({ senderId, receiverIds, text, createdAt, userAvatar, userName }) => {
        receiverIds.map(id => {
            const user = getUser(id);
            // console.log(user?.socketId)
            io.to(user?.socketId).emit("getProjectsMessage", {
                senderId,
                text,
                userAvatar,
                userName,
                createdAt
            });
        })
    });

    //when disconnect
    socket.on("disconnect", () => {
        // console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

server.listen(PORT, () => console.log(`the server started at ${PORT}`))



