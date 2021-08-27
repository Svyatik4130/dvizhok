import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { NavLink } from "react-router-dom";

export default function Conversation({ conversation }) {
    const userData = useSelector(state => state.userData)
    const [user, setUser] = useState(null)
    const [lastMessage, setlastMessage] = useState(null)

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== userData.user.id);

        const getUser = async () => {
            try {
                const res = await axios.post("/users/get-user", { id: friendId });
                setUser(res.data);

                const lastMessRes = await axios.get(`/messages/lastMess/${conversation._id}`)
                setlastMessage(lastMessRes.data)
                
                console.log(lastMessRes.data.createdAt.getHour())
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [conversation]);

    return (
        <NavLink activeClassName="active-conversation" to={`/dashboard/messages/${conversation._id}`} >
        <div className="flex w-full mt-3 justify-between cursor-pointer bg-gray-200 hover:bg-gray-100 transition-all p-2 rounded-xl">
            <div className="flex">
                <div className="w-14 h-14 rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${user?.avatarUrl})` }}></div>
                <div className='ml-2'>
                    <p className="font-semibold text-lg">{user?.name}</p>
                    <p className="font-medium truncate text-gray-400">{lastMessage ? (lastMessage.text): (null)}</p>
                </div>
            </div>
            <p className="font-medium text-lgtext-gray-400 ml-auto">{lastMessage ? (lastMessage.createdAt.split('.')[0].slice(-8, -3)) : (null)}</p>
        </div>
        </NavLink >
    )
}
