import { useEffect, useState } from "react";
import React from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import ErrorNotice from '../../misc/ErrorNotice';
import SuccessNotice from '../../misc/SuccessNotice';
import Popup from 'reactjs-popup';
import Fuse from 'fuse.js'

import BellNotificator from './BellNotificator'

export default function DescTopMenu() {
    const userData = useSelector(state => state.userData)
    const allProjects = useSelector(state => state.allProjects)
    const [searchText, setsearchText] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [findedUsers, setFindedUsers] = useState()
    const [findedProjects, setFindedProjects] = useState()
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")
    const [reqLoading, setreqLoading] = useState(false)
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const history = useHistory()

    const [amount, setAmount] = useState(0)

    const Pay = async (close) => {
        try {
            setreqLoading(true)
            const params = { userId: userData.user.id, amount: amount, email: userData.user.email, phone: userData.user.phoneNumber[0] }
            const resWayForPay = await axios.post("/payments/create-potential-invoice", params)
            console.log(resWayForPay.data)
            setreqLoading(false)
            close()
            window.open(resWayForPay.data.invoiceUrl, '_blank');
        } catch (error) {
            console.log(error)
            setreqLoading(false)
            setError(error.response.data.msg)
        }
    }

    const handleAmountInputChange = (amount) => {
        if (amount < 0) {
            setAmount(0)
        } else if (!Number.isInteger(amount)) {
            if (amount === "") {
                setAmount(amount)
            } else {
                setAmount(Math.round(amount))
            }
        } else {
            setAmount(amount)
        }
    }

    useEffect(() => {
        const getUsersNProjects = async () => {
            try {
                const userRed = await axios.get("/users/get-all-users")
                setAllUsers(userRed.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUsersNProjects()
    }, [userData.user.id])

    useEffect(() => {
        const optionsForUsers = {
            minMatchCharLength: 2,
            keys: [
                "name"
            ]
        }
        const optionsForProjects = {
            minMatchCharLength: 2,
            keys: [
                "projectName"
            ]
        }
        console.log(allUsers)
        const fuseUsers = new Fuse(allUsers, optionsForUsers)
        const fuseProjects = new Fuse(allProjects, optionsForProjects)
        const findedfuseUsers = fuseUsers.search(searchText)
        const findedfuseProjects = fuseProjects.search(searchText)
        setFindedUsers(findedfuseUsers)
        setFindedProjects(findedfuseProjects)

        const UsNProj = findedfuseUsers.concat(findedfuseProjects)
        if (UsNProj.length > 0) {
            setInputStyle("rounded-3xl bg-white")
        } else {
            setInputStyle("rounded-3xl bg-gray-100")
        }
    }, [searchText])

    return (
        <div className="lg:w-8/9 w-full lg:fixed mt-12 lg:mt-0 pt-5 flex lg:flex-row flex-col items-center lg:pl-5 pl-0 bg-blur">
            <div className="flex lg:w-6/12 w-full items-center">
                <div className="relative xl:w-8/12 w-7/12">
                    <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} w-full transition-all relative z-30 text-lg font-medium p-3 rounded-full outline-none focus:bg-white`} placeholder="Пошук людей чи проектів" />
                    {/* <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} transition-all relative z-20 px-3 py-2 w-full outline-none focus:bg-white`} placeholder="Пошук ваших чатів та користувачів" /> */}
                    {findedUsers?.length > 0 || findedProjects?.length > 0 ? (<div className="relative z-auto" onClick={() => { setFindedProjects(); setFindedUsers() }}><div className="h-screen w-screen fixed top-0 left-0"></div></div>) : (null)}
                    <div className="rounded-3xl mt-1.5 shadow-xl max-h-138 p-2 overflow-y-scroll absolute h-auto transition-all pt-9 top-0 w-full bg-white">
                        {findedUsers?.length > 0 ? (<p className="text-xl font-bold pt-2">Користувачі:</p>) : (null)}
                        {findedUsers ? (
                            findedUsers.map(({ item }) => {
                                return (
                                    <div key={item._id} onClick={() => { history.push(`/dashboard/userpage/${item._id}/created-projects`); setsearchText("") }} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                        <div className="flex items-center">
                                            <div className="w-14 h-14 rounded-full relative responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${item.avatarUrl})` }}>
                                            </div>
                                            <div className="ml-2 ">
                                                <a className="font-semibold text-lg block">{item.name}</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (null)}
                        {findedProjects?.length > 0 ? (<p className="text-xl font-bold pt-2">Проекти:</p>) : (null)}
                        {findedProjects ? (findedProjects.map(({ item }) => {
                            return (
                                <div key={item._id} onClick={() => { history.push(`/dashboard/projects/${item._id}`); setsearchText("") }} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                    <div className="flex items-center min-w-0">
                                        <div className="w-14 h-14 flex-shrink-0 rounded-xl relative responsive-image-bgImgUrl" style={{ backgroundImage: `url(${item.logoUrl[0]})` }}>
                                        </div>
                                        <div className="ml-2 truncate">
                                            <a className="font-semibold text-lg">{item.projectName}</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })) : (null)}
                    </div>
                </div>
                <div className="flex items-center ml-4 justify-center xl:w-4/12 md:w-6/12 w-5/12">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/wallet.png" alt="dvizhok_wallte" className="w-9 hidden lg:block" />
                    <div className="text-center text-lg font-medium text-purple-950 ml-2">
                        {/* Funds here */}
                        <p>{userData.user.balance}</p>
                        <p>Ваш потенціал</p>
                    </div>
                </div>
            </div>
            <div className="lg:flex lg:w-6/12 md:w-7/12 hidden items-center">
                <div className="xl:w-7/12 lg:w-6/12 md:w-5/12 flex px-2">
                    {/* add funds here */}
                    {userData.user.role === 0 ? (
                        <Popup
                            trigger={
                                <p className="cursor-pointer flex-grow rounded-lg px-4 py-2 bg-purple-950 text-white text-lg font-semibold text-center">Стати Творцем</p>
                            }
                            modal
                            nested
                        >
                            {close => (
                                <div className="modal bg-white rounded-xl">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="w-full bg-purple-850 px-4 py-2 text-white text-2xl font-bold rounded-t-xl">
                                        Вікно зміни аватара
                                    </div>

                                    <div className="w-10/12 mt-3 m-auto">
                                        <div className="px-2 m-auto">
                                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                            {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                        </div>
                                    </div>

                                    <p className="font-medium text-lg px-5 mt-4 text-gray-600">Будь ласка, виберіть суму оплати</p>
                                    <div className="w-full m-auto flex p-6">
                                        <input value={amount} onChange={(e) => handleAmountInputChange(e.target.value)} type="number" className="h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" min="100" /><br />
                                    </div>
                                    <div className="w-full rounded-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                        {reqLoading ? (
                                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                        ) : (
                                            null
                                        )}
                                        <button onClick={() => { Pay(close) }} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-yellow-350 text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Поповнити</button>
                                        <button
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                close();
                                            }}
                                        >
                                            Закрити
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    ) : (
                        <Popup
                            trigger={
                                <p className="cursor-pointer flex-grow rounded-lg px-4 py-2 bg-purple-950 text-white text-lg font-semibold text-center">Поповнити Потенціал</p>
                            }
                            modal
                            nested
                        >
                            {close => (
                                <div className="modal bg-white rounded-xl">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="w-full bg-purple-850 px-4 py-2 text-white text-2xl font-bold rounded-t-xl">
                                        Вікно поповнення потенціалу
                                    </div>

                                    <div className="w-10/12 mt-3 m-auto">
                                        <div className="px-2 m-auto">
                                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                            {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                        </div>
                                    </div>

                                    <p className="font-medium text-lg px-5 mt-4 text-gray-600">Будь ласка, виберіть суму оплати</p>
                                    <div className="w-full m-auto flex p-6">
                                        <input value={amount} onChange={(e) => handleAmountInputChange(e.target.value)} type="number" className="h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" min="100" /><br />
                                    </div>
                                    <div className="w-full rounded-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                        {reqLoading ? (
                                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                        ) : (
                                            null
                                        )}
                                        <button onClick={() => { Pay(close) }} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-yellow-350 text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Поповнити</button>
                                        <button
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                close();
                                            }}
                                        >
                                            Закрити
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    )}
                    <BellNotificator />
                </div>
                <div className="xl:w-5/12 lg:w-6/12 md:w-7/12">
                    <div className="flex justify-end pr-4">
                        <div onClick={() => history.push("/dashboard/profile/personal_info")} className="mb-1 w-14 h-14 mr-2 relative rounded-full hover:opacity-80 transition-all cursor-pointer overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}></div>
                        <div>
                            <p onClick={() => history.push("/dashboard/profile/personal_info")} className="inline-block font-bold text-lg text-purple-850 cursor-pointer hover:opacity-80 transition-all">{userData.user.name}</p>
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

        </div >
    )
}
