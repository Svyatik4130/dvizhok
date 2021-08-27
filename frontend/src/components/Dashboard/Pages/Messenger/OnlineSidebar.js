import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function OnlineSidebar({ member, onlineUsers }) {
    const [friend, setFriend] = useState("")
    const userData = useSelector(state => state.userData)
    const [isLoading, setIsLoading] = useState(true)
    const [isUserOnline, setIsUserOnline] = useState('bg-gray-200')
    const history = useHistory()

    useEffect(() => {
        const getFriendProf = async () => {
            try {
                if (member !== userData.user.id) {
                    const getUser = await axios.post("/users/get-user", { id: member })
                    setFriend(getUser.data)
                    setIsUserOnline('bg-gray-200')
                    onlineUsers.map(onlineUser => {
                        if (onlineUser.userId === member) {
                            setIsUserOnline("bg-green-600")
                        }
                    })
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getFriendProf()
    }, [member, onlineUsers])

    if (isLoading) {
        return <SimpleLoader />
    }
    if (member !== userData.user.id) {
        return (
            <div onClick={() => history.push(`/dashboard/userpage/${member}/created-projects`)} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full relative responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${friend.avatarUrl})` }}>
                        <div className={`absolute top-0 w-4 h-4 ${isUserOnline} border-2 rounded-full`}></div>
                    </div>
                    <div className="ml-2 ">
                        <a className="font-semibold text-lg block">{friend.name}</a>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}
