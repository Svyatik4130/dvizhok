import React, { useEffect, useState, useRef } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
import Message from './Message';
import OnlineSidebar from './OnlineSidebar';
import SimpleLoader from '../../../Loaders/SimpleLoader';

export default function Panel() {
    const { id } = useParams()
    const user = useSelector(state => state.userData).user
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();
    const [friend, setFriend] = useState(null)
    const history = useHistory()

    const [btnColor, setbtnColor] = useState("bg-gray-500 cursor-default")
    const [btnFunction, setbtnFunction] = useState("button")

    useEffect(() => {
        const getCurrConv = async () => {
            try {
                const chatReq = await axios.get(`/conversations/find-by-id/${id}`)

                const friendsId = chatReq.data.members.filter(member => member !== user.id)
                console.log(friendsId)
                const getUser = await axios.post("/users/get-user", { id: friendsId[0] })
                setFriend(getUser.data)

                if (!chatReq.data.members.includes(user.id)) {
                    history.push("/dashboard/messages")
                }

                setCurrentChat(chatReq.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCurrConv()
    }, [id])

    useEffect(() => {
        socket.current = io("/");
        socket.current.on("getMessage", (data) => {
            const isoDate = new Date().toISOString()
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: data.createdAt
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(users)
        });
    }, [user, newMessage]);

    useEffect(() => {
        if (currentChat !== null) {
            const getMessages = async () => {
                try {
                    const res = await axios.get("/messages/" + currentChat?._id);
                    setMessages(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getMessages();
        }
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (btnFunction === 'submit') {
            const message = {
                sender: user.id,
                text: newMessage,
                conversationId: currentChat._id,
            };

            const receiverId = currentChat.members.find(
                (member) => member !== user.id
            );

            const isoDate = new Date().toISOString()
            socket.current.emit("sendMessage", {
                senderId: user.id,
                receiverId,
                text: newMessage,
                createdAt: isoDate
            });

            try {
                const res = await axios.post("/messages/add", message);
                setMessages([...messages, res.data]);
                setNewMessage("");
                console.log(res.data.createdAt)
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, newMessage]);

    useEffect(() => {
        if (newMessage.length > 0 && newMessage.replace(/\s/g, '').length) {
            setbtnColor("bg-purple-950 hover:bg-purple-850 hover:bg-opacity-80")
            setbtnFunction("submit")
        } else {
            setbtnColor("bg-gray-500 cursor-default")
            setbtnFunction("button")
        }
    }, [newMessage])

    if (friend == null || currentChat == null) {
        return <SimpleLoader />
    }

    return (
        <div className="w-8/12 pt-2">
            <div className="bg-white relative rounded-l-3xl p-4" style={{ height: window.innerHeight - 105 }}>

                <div className="h-full">
                    <div className="w-full h-full flex">
                        <div className="h-full w-8/12 relative border-r-2 pb-12 ">
                            <div className="overflow-y-scroll h-full" ref={scrollRef}>
                                {messages.map((m) => (
                                    <div ref={scrollRef} key={m._id}>
                                        <Message message={m} own={m.sender === user.id} friend={friend} />
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="absolute w-full flex items-center py-1 bottom-0">
                                    <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} type="text" className="rounded-full bg-gray-200 px-4 py-2 w-10/12 outline-none" placeholder="Введіть повідомлення..." />
                                    <div className="w-2/12 flex-1 px-2">
                                        <button type={btnFunction} className={`w-full h-full ${btnColor} transition-all rounded-3xl py-2 flex justify-center`}>
                                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/send_icon.png" alt="send_icon" className="h-6" />
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div className="w-4/12 p-4 overflow-y-scroll h-full">
                            <p className="font-medium text-gray-700 ">Люди в чаті</p>
                            {currentChat.members.map(member => {
                                return <OnlineSidebar member={member} onlineUsers={onlineUsers} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
