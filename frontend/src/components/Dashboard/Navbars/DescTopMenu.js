import React from 'react'
import { useSelector } from 'react-redux'

export default function DescTopMenu() {
    const userData = useSelector(state => state.userData)

    return (
        <div className="lg:w-8/9 w-full lg:fixed mt-12 lg:mt-0 pt-5 flex lg:flex-row flex-col items-center lg:pl-5 pl-0 bg-blur">
            <div className="flex lg:w-6/12 w-full items-center">
                <input type="text" className="xl:w-8/12 w-7/12 text-lg font-medium p-3 rounded-full outline-none" placeholder="Пошук людей чи проектів" />
                <div className="flex items-center ml-4 justify-center xl:w-4/12 md:w-6/12 w-5/12">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/wallet.png" alt="dvizhok_wallte" className="w-9 hidden lg:block" />
                    <div className="text-center text-lg font-medium text-purple-950 ml-2">
                        {/* Funds here */}
                        <p>200200 грн</p>
                        <p>Ваш потенціал</p>
                    </div>
                </div>
            </div>
            <div className="lg:flex lg:w-6/12 md:w-7/12 hidden items-center">
                <div className="xl:w-6/12 md:w-5/12 px-2">
                    {/* add funds here */}
                    <p className="cursor-pointer rounded-lg px-4 py-2 bg-purple-950 text-white text-lg font-semibold text-center">Поповнити Потенціал </p>
                </div>
                <div className="w-6/12">
                    <div className="flex justify-end pr-4">
                        <div className="mb-1 w-14 h-14 mr-2 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}></div>
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

        </div>
    )
}
