const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const path = require('path');
const passport = require("passport");
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

app.use("/users", require("./routes/userRouter"))
app.use("/landing", require("./routes/landingRouter"))
app.use("/project", require("./routes/projectRouter"))
app.use("/conversations", require("./routes/conversationRouter"))
app.use("/messages", require("./routes/messageRouter"))

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
    console.log("a " + socket.id + " connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

server.listen(PORT, () => console.log(`the server started at ${PORT}`))



