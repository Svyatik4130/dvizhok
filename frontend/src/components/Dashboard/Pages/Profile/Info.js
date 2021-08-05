import React from 'react'
import { useSelector } from 'react-redux'

export default function Info() {
    const userData = useSelector(state => state.userData)

    return (

            <div className="flex w-full">
                <div className="w-8/12 flex">
                    <div className=" w-44 bg-cover h-44 border-4 rounded-full">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/+no_photo_user.png" alt={userData.user.name} className="object-cover w-64" />
                    </div>
                    <div className="ml-4">
                        <p className="text-5xl text-purple-950 font-bold">{userData.user.name}</p>
                        <div className="mt-4">
                            {userData.user.role === 0 ? (
                                <div>
                                    <div className="flex gap-1 items-center">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-12" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-12" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-12" />
                                    </div>
                                    <p className="text-2xl font-semibold inline-block text-purple-850 mt-4">ОКтивіст</p>
                                </div>
                            ) : userData.user.role === 1 ? (
                                <div>
                                    <div className="flex gap-1 items-center">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-12" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-12" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-12" />
                                    </div>
                                    <p className="text-2xl font-semibold inline-block text-purple-850 mt-4">Творець</p>
                                </div>
                            ) : userData.user.role === 2 ? (
                                <div>
                                    <div className="flex gap-1 items-center">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-12" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-12" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-12" />
                                    </div>
                                    <p className="text-2xl font-semibold inline-block text-purple-850 mt-4">Лідер</p>
                                </div>
                            ) : (
                                null
                            )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="m-auto text-center">
                        <p className="text-purple-950 text-2xl mb-4 font-semibold">Ваш потенціал: 0 грн</p>
                        {/* title has to be responsive */}
                        <a href="#" className="bg-yellow-350 font-semibold text-lg text-purple-950 rounded-full px-6 py-2">Стати Творцем</a>
                    </div>
                </div>
        </div>
    )
}
