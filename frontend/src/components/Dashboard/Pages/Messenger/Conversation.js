import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

export default function Conversation({ conversation }) {
    const userData = useSelector(state => state.userData)
    const [user, setUser] = useState(null)
    const [lastMessage, setlastMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== userData.user.id);

        const getUser = async () => {
            try {
                const res = await axios.post("/users/get-user", { id: friendId });
                setUser(res.data);

                const lastMessRes = await axios.get(`/messages/lastMess/${conversation._id}`)
                setlastMessage(lastMessRes.data)

                setIsLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [conversation]);

    if (isLoading) {
        return (
            <div class="animate-pulse flex space-x-4 mt-3 p-2">
                <div class="rounded-full bg-gray-400 h-12 w-12"></div>
                <div class="flex-1 space-y-3 h-14">
                    <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-400 rounded"></div>
                </div>
            </div>
        )
    }

    return (
        <NavLink activeClassName="active-conversation" to={`/dashboard/messages/${conversation._id}`} >
            <div className="flex w-full mt-3 justify-between cursor-pointer bg-gray-200 hover:bg-gray-100 transition-all p-2 rounded-xl">
                <div className="flex">
                    <div className="w-14 h-14 rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${user?.avatarUrl})` }}></div>
                    <div className='ml-2'>
                        <p className="font-semibold text-lg">{user ? (user?.name) : (<strong className="text-gray-500">Користувач не знайдений</strong>)}</p>
                        <p className="font-medium truncate text-gray-400">{lastMessage ? (lastMessage.text) : (null)}</p>
                    </div>
                </div>
                <p className="font-medium text-lgtext-gray-400 ml-auto">{lastMessage ? (lastMessage.createdAt.split('.')[0].slice(-8, -3)) : (null)}</p>
            </div>
        </NavLink >
    )
}
