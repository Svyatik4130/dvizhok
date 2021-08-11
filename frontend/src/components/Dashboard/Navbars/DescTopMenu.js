import React from 'react'
import { useSelector } from 'react-redux'

export default function DescTopMenu() {
    const userData = useSelector(state => state.userData)

    return (
        <div className="w-8/9 fixed pt-5 flex items-center pl-5 bg-blur">
            <input type="text" className="w-4/12 text-lg font-medium p-3 rounded-full outline-none" placeholder="Пошук людей чи проектів" />
            <div className="flex items-center ml-4 justify-center w-2/12">
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/wallet.png" alt="dvizhok_wallte" className="w-9" />
                <div className="text-center text-lg font-medium text-purple-950 ml-2">
                    {/* Funds here */}
                    <p>200200 грн</p>
                    <p>Ваш потенціал</p>
                </div>
            </div>
            <div className="w-3/12 px-2">
                {/* add funds here */}
                <p className="cursor-pointer rounded-lg px-4 py-2 bg-purple-950 text-white text-lg font-semibold text-center">Поповнити Потенціал </p>
            </div>
            <div className="w-3/12">
                <div className="flex justify-end pr-4">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/+no_photo_user.png" alt="dvizhok_user" className="rounded-full w-14 border-2" />
                    <div>
                        <p className="inline-block font-bold text-lg text-purple-850">{userData.user.name}</p>
                        {userData.user.role === 0 ? (
                            <div className="flex gap-1 items-center">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                <p className="text-lg ml-3 font-bold inline-block text-purple-850">ОКтивіст</p>
                            </div>
                        ) : userData.user.role === 1 ? (
                            <div className="flex gap-1 items-center">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                <p className="text-lg ml-3 font-bold inline-block text-purple-850">Творець</p>
                            </div>
                        ) : userData.user.role === 2 ? (
                            <div className="flex gap-1 items-center">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                <p className="text-lg ml-3 font-bold inline-block text-purple-850">Лідер</p>
                            </div>
                        ) : (
                            null
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
