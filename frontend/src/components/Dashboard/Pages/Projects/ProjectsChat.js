import React, { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client";
import Message from '../Messenger/Message';
import ErrorNotice from '../../../misc/ErrorNotice'
import axios from "axios";
import { useSelector } from 'react-redux'

export default function ProjectsChat({ projectId }) {
    const [btnColor, setbtnColor] = useState("bg-gray-500 cursor-default")
    const [btnFunction, setbtnFunction] = useState("button")
    const [messages, setMessages] = useState("");
    const scrollRef = useRef();
    const socket = useRef();
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const currProject = useSelector(state => state.allProjects).filter(project => projectId === project._id)[0]
    const user = useSelector(state => state.userData).user
    const [error, setError] = useState()

    const [areMessLoaded, setareMessLoaded] = useState(false)

    useEffect(() => {
        socket.current = io("/");
        socket.current.on("getProjectsMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                userAvatar: data.userAvatar,
                userName: data.userName,
                createdAt: data.createdAt
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currProject?.teamMembers.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currProject]);

    useEffect(() => {
        socket.current.emit("addUser", user.id);
        socket.current.on("getUsers");
    }, [user, newMessage]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currProject._id);
                setMessages(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currProject]);

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
                conversationId: currProject._id,
                userAvatar: user.avaUrl,
                userName: user.name,
            };

            const receiverIds = currProject.teamMembers.filter(
                (member) => member !== user.id
            );

            const isoDate = new Date().toISOString()
            socket.current.emit("sendMessageToProjects", {
                senderId: user.id,
                receiverIds,
                text: newMessage,
                userAvatar: user.avaUrl,
                userName: user.name,
                createdAt: isoDate,
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
        if (!areMessLoaded) {
            document.body.style.position = "fixed"
            scrollRef.current?.scrollIntoView();
            document.body.style.position = ""
            setareMessLoaded(true)
        }
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

    if (messages === "") {
        return <h1>Loading...</h1>
    }

    return (
        <div className="w-full">
            <div className="bg-white relative rounded-3xl pb-12 h-196">
                <p className="text-2xl text-center py-1 font-semibold text-purple-950">Чат Проекту</p>
                <div className="w-full h-0.5 bg-gray-300"></div>
                <div className={`overflow-y-scroll pb-10 px-2 h-full`} >
                    <div className="overflow-y-scroll h-full">
                        {messages.length > 0 ? (
                            messages.map((m) => (
                                <div ref={scrollRef} key={m._id}>
                                    <Message message={m} own={m.sender === user.id} friend={{ avatarUrl: m.userAvatar, name: m.userName }} />
                                </div>
                            ))) : (
                            <div className="w-full opacity-50">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                                <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">У чаті проекту ще немає повідомлень</p>
                            </div>
                        )}
                        <div className="w-full mt-2">
                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="absolute w-full flex items-center p-1 bottom-0">
                        <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} type="text" className="rounded-full bg-gray-200 px-4 py-2 w-10/12 outline-none" placeholder="Введіть повідомлення..." />
                        <div className="w-2/12 flex-1 px-2">
                            <button type={btnFunction} className={`w-full h-full transition-all ${btnColor} rounded-3xl py-2 flex justify-center`}>
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/send_icon.png" alt="send_icon" className="h-6" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
