import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Message({ message, own, friend }) {
    const history = useHistory()

    return (
        <div>
            {own ? (
                <div className="mt-1 mr-1 flex">
                    <div className="bg-purple-950 rounded-xl py-1 ml-auto mr-0 px-3 ">
                        <p className="font-medium text-lg text-white break-words max-w-xxs lg:max-w-md">{message.text}</p>
                        <p className="font-medium text-right text-xs text-gray-300">{message.createdAt.split('.')[0].slice(-8, -3)}</p>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2 mt-2 items-end">
                    <div onClick={() => history.push(`/dashboard/userpage/${message.sender}/created-projects`)} className="w-10 h-10 cursor-pointer rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${friend.avatarUrl})` }}></div>
                    <div>
                        <p className="font-medium text-sm">{friend.name}</p>
                        <div className="bg-gray-300 rounded-xl py-1 px-3">
                            <p className="font-medium text-lg break-words inline-block max-w-xxs lg:max-w-md">{message.text}</p>
                            <p className="font-medium text-right text-xs text-gray-500">{message?.createdAt.split('.')[0].slice(-8, -3)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
