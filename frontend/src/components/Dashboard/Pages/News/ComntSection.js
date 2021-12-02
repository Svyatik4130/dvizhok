import React, { useState, useEffect, useRef } from 'react'

export default function ComntSection({ advtInfo }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [btnColor, setbtnColor] = useState("bg-gray-500 cursor-default")
    const [btnFunction, setbtnFunction] = useState("button")
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();

    const [error, setError] = useState()

    const handleSubmit = async (e) => {
    }

    useEffect(() => {
        if (newMessage.length > 0 && newMessage.replace(/\s/g, '').length) {
            setbtnColor("bg-purple-950 hover:bg-purple-850 hover:bg-opacity-80")
            setbtnFunction("submit")
        } else {
            setbtnColor("bg-gray-500 cursor-default")
            setbtnFunction("button")
        }
    }, [newMessage])

    useEffect(() => {
        var messagesDiv = document.getElementById(`messages-${advtInfo._id}`);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, []);

    return (
        <div className="relative">
            <div className={`h-${isExpanded ? (56) : (24)} flex flex-col transition-all`}>
                <a onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer text-lg text-purple-950 font-medium">{isExpanded ? ("Показати менше...") : ("Показати більше...")}</a>
                <div ref={scrollRef} id={`messages-${advtInfo._id}`} className="flex-grow overflow-y-scroll">
                    {/* one comment */}
                    <div className="flex">
                        <p className="font-bold flex-shrink-0 text-sm">Артем Петрик</p>
                        <p className="text-sm ml-2">ЦЦе сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?ні?</p>
                    </div>
                    <div className="flex">
                        <p className="font-bold flex-shrink-0 text-sm">Артем Петрик</p>
                        <p className="text-sm ml-2">ЦЦе сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?ні?</p>
                    </div>
                    <div className="flex">
                        <p className="font-bold flex-shrink-0 text-sm">Артем Петрик</p>
                        <p className="text-sm ml-2">ЦЦе сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?ні?</p>
                    </div>
                    <div className="flex">
                        <p className="font-bold flex-shrink-0 text-sm">Артеfffм Петрик</p>
                        <p className="text-sm ml-2">ЦЦе сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?Це сьогодні?ні?</p>
                    </div>
                </div>
            </div>
            <div className="h-12"></div>
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
    )
}
