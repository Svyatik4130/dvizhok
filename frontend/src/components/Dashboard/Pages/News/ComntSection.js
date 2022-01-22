import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import ErrorNotice from '../../../misc/ErrorNotice'

export default function ComntSection({ advtInfo }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [btnColor, setbtnColor] = useState("bg-gray-500 cursor-default")
    const [btnFunction, setbtnFunction] = useState("button")
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState("");
    const scrollRef = useRef();

    const user = useSelector(state => state.userData).user

    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        if (newComment.length > 200) {
            setError("Повідомлення повинно бути менше 200 символів")
            return
        }

        if (btnFunction === 'submit') {
            const comment = {
                advrtId: advtInfo._id,
                senderId: user.id,
                text: newComment,
                userName: user.name,
            };

            try {
                const res = await axios.post("/comments/add", comment);
                setComments([...comments, res.data]);
                setNewComment("");
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get("/comments/" + advtInfo._id);
                setComments(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        getComments();
    }, []);

    useEffect(() => {
        if (newComment.length > 0 && newComment.replace(/\s/g, '').length) {
            setbtnColor("bg-purple-950 hover:bg-purple-850 hover:bg-opacity-80")
            setbtnFunction("submit")
        } else {
            setbtnColor("bg-gray-500 cursor-default")
            setbtnFunction("button")
        }
    }, [newComment])

    useEffect(() => {
        var messagesDiv = document.getElementById(`messages-${advtInfo._id}`);
        if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [comments]);

    return (
        <div className="relative">
            <div className={`h-${isExpanded ? (56) : (24)} flex flex-col transition-all`}>
                {comments.length > 0 ? (
                    <>
                        <a onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer text-lg text-purple-950 font-medium">{isExpanded ? ("Показати менше...") : ("Показати більше...")}</a>
                        <div ref={scrollRef} id={`messages-${advtInfo._id}`} className="flex-grow overflow-y-scroll">
                            {comments.map(comment => {
                                return (
                                    <div className="flex">
                                        <p className="font-bold flex-shrink-0 text-sm">{comment.userName}</p>
                                        <p className="text-sm ml-2">{comment.text}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <div>
                        <p className="text-xl text-center mt-7 text-gray-500">Коментарів ще немає. Залиште перший коментар!</p>
                    </div>
                )}
            </div>
            <div className="h-12"></div>
            <form onSubmit={handleSubmit}>
                <div className="absolute w-full flex items-center p-1 bottom-0">
                    <input onChange={(e) => setNewComment(e.target.value)} value={newComment} type="text" className="rounded-full bg-gray-200 px-4 py-2 w-10/12 outline-none" placeholder="Введіть коментар..." />
                    <div className="w-2/12 flex-1 px-2">
                        <button type={btnFunction} className={`w-full h-full transition-all ${btnColor} rounded-3xl py-2 flex justify-center`}>
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/send_icon.png" alt="send_icon" className="h-6" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
