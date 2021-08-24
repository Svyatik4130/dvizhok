import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Message({ message, own }) {
    const [friend, setFriend] = useState("")

    useEffect(() => {
        if (!own) {
            const getFriendProf = async () => {
                try {
                    const getUser = await axios.post("/users/get-user", { id: message.sender })
                    setFriend(getUser.data)
                } catch (error) {
                    console.log(error)
                }
            }
            getFriendProf()
        }
    }, [])

    return (
        <div>
            {own ? (
                <div className="mt-1 mr-1 flex">
                    <div className="bg-purple-950 rounded-3xl py-1 ml-auto mr-0 px-3 ">
                        <p className="font-medium text-lg text-white break-words max-w-md">{message.text}</p>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2 mt-2 items-end">
                    <div className="w-10 h-10 rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${friend.avatarUrl})` }}></div>
                    <div>
                        <p className="font-medium text-sm">{friend.name}</p>
                        <p className="font-medium text-lg py-1 px-3 bg-gray-300 rounded-3xl break-words inline-block max-w-md">{message.text}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
