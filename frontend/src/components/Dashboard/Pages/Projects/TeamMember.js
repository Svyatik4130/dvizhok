import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function TeamMember({ userId }) {
    const [user, setUser] = useState()
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const preloadOpps = async () => {
            try {
                const res = await axios.post("/users/get-user", { id: userId })
                setUser(res.data)

                setisLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        preloadOpps()
    }, [userId])

    if (isLoading) {
        return (
            <div class="animate-pulse flex space-x-4 mt-2 p-2">
                <div class="rounded-full bg-gray-400 h-12 w-12"></div>
                <div class="flex-1 space-y-3 h-12">
                    <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-400 rounded"></div>
                </div>
            </div>
        )
    }
    return (
        <div onClick={() => { history.push(`/dashboard/userpage/${user._id}/created-projects`) }} className="flex cursor-pointer w-full mt-2 hover:shadow-inner p-2 shadow-none hover:bg-gray-100 rounded-3xl transition-all">
            <div className="h-12 w-12 rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${user.avatarUrl})` }}></div>
            <div className="ml-2">
                <p className="font-semibold  text-gray-700">{user.name}</p>
                <div className="flex">
                    {user.roleId === 0 ? (
                        <div className="flex gap-1 items-center">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-5" />
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-5" />
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-5" />
                            <p className=" ml-3 font-bold inline-block text-purple-850">ОКтивіст</p>
                        </div>
                    ) : user.roleId === 1 ? (
                        <div className="flex gap-1 items-center">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-5" />
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-5" />
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-5" />
                            <p className=" ml-3 font-bold inline-block text-purple-850">Творець</p>
                        </div>
                    ) : user.roleId === 2 ? (
                        <div className="flex gap-1 items-center">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-5" />
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-5" />
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-5" />
                            <p className=" ml-3 font-bold inline-block text-purple-850">Лідер</p>
                        </div>
                    ) : (
                        null
                    )
                    }
                </div>
            </div>
        </div>
    )
}
