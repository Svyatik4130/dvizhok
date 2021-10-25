import React, { useEffect, useState, useRef } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
import Message from './Message';
import OnlineSidebar from './OnlineSidebar';
import SimpleLoader from '../../../Loaders/SimpleLoader';
import ErrorNotice from '../../../misc/ErrorNotice'

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
    const [error, setError] = useState()
    const [isOnlineUsersListExpandedMob, setisOnlineUsersListExpandedMob] = useState(false)
    const [mobileStylesForOnlineUsers, setmobileStylesForOnlineUsers] = useState("fixed -right-80")

    useEffect(() => {
        const getCurrConv = async () => {
            try {
                const chatReq = await axios.get(`/conversations/find-by-id/${id}`)

                const friendsId = chatReq.data.members.filter(member => member !== user.id)
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
        if (document.documentElement.clientWidth > 1023) {
            setisOnlineUsersListExpandedMob(true)
            setmobileStylesForOnlineUsers("relative")
        }
        socket.current = io("/");
        socket.current.on("getMessage", (data) => {
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
        setError("")
        if (newMessage.length > 200) {
            setError("Повідомлення повинно бути менше 200 символів")
            return
        }

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

            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, newMessage, error]);

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
        <div className="lg:w-8/12 w-full pt-2">
            <div className="lg:hidden mb-3">
                <p onClick={() => { history.push("/dashboard/messages") }} className="font-medium flex items-center text-lg text-purple-950"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>Назад до бесід</p>
            </div>
            <div className="bg-white relative rounded-3xl lg:rounded-l-3xl p-4" style={{ height: window.innerHeight - 105 }}>
                <div className="h-full">
                    <div className="w-full h-full flex">
                        <div className="h-full lg:w-8/12 w-full flex flex-col relative lg:border-r-2 lg:pb-12 ">
                            <div className="w-full flex pb-8 lg:hidden">
                                <svg onClick={() => { setisOnlineUsersListExpandedMob(true); setmobileStylesForOnlineUsers("absolute right-0") }} className='absolute right-0' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>
                            <div className="overflow-y-scroll h-full mb-12 lg:mb-0" ref={scrollRef}>
                                {messages.map((m) => (
                                    <div ref={scrollRef} key={m._id}>
                                        <Message message={m} own={m.sender === user.id} friend={friend} />
                                    </div>
                                ))}
                                <div className="w-full mt-2">
                                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                </div>
                            </div>
                            {friend._id === "6150c9c7aa554a186344ba4b" || friend.role > 2 ? (null) : (
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
                            )}
                        </div>

                        {isOnlineUsersListExpandedMob ? (
                            <div className={`lg:w-4/12 w-10/12 ${mobileStylesForOnlineUsers} transition-all lg:relative top-0 rounded-l-3xl bg-gray-50 lg:bg-transparent p-4 overflow-y-scroll h-full`}>
                                <div className="flex justify-between items-center ">
                                    <p className="font-medium text-gray-700 ">Люди в чаті</p>
                                    <div onClick={() => { setisOnlineUsersListExpandedMob(false); setmobileStylesForOnlineUsers("fixed -right-80") }} className="bg-white lg:hidden rounded-full "><svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                                </div>
                                {currentChat.members.map(member => {
                                    return <OnlineSidebar member={member} onlineUsers={onlineUsers} />
                                })}
                            </div>
                        ) : (null)}
                    </div>
                </div>
            </div>
        </div >
    )
}
