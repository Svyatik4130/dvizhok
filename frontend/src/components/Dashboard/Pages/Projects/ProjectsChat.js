import React, { useState } from 'react'

export default function ProjectsChat() {
    const [btnColor, setbtnColor] = useState("bg-gray-500 cursor-default")

    return (
        <div className="w-full">
            <div className="bg-white relative rounded-3xl pb-12 h-196">
                <p className="text-2xl text-center py-1 font-semibold text-purple-950">Чат Проекту</p>
                <div className="w-full h-0.5 bg-gray-300"></div>

                <form >
                    <div className="absolute w-full flex items-center p-1 bottom-0">
                        <input type="text" className="rounded-full bg-gray-200 px-4 py-2 w-10/12 outline-none" placeholder="Введіть повідомлення..." />
                        <div className="w-2/12 flex-1 px-2">
                            <button className={`w-full h-full transition-all ${btnColor} rounded-3xl py-2 flex justify-center`}>
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/send_icon.png" alt="send_icon" className="h-6" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
