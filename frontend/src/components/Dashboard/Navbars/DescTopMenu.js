import { useEffect, useState } from "react";
import React from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { Switch, Route, useHistory } from "react-router-dom";
import Fuse from 'fuse.js'

export default function DescTopMenu() {
    const userData = useSelector(state => state.userData)
    const allProjects = useSelector(state => state.allProjects)
    const [searchText, setsearchText] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [findedUsers, setFindedUsers] = useState()
    const [findedProjects, setFindedProjects] = useState()
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")

    const history = useHistory()

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
        const fuseUsers = new Fuse(allUsers, optionsForUsers)
        const fuseProjects = new Fuse(allProjects, optionsForProjects)
        const findedfuseUsers = fuseUsers.search(searchText).filter(({ item }) => { return item._id !== userData.user.id })
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
                    <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} w-full transition-all relative z-20 text-lg font-medium p-3 rounded-full outline-none focus:bg-white`} placeholder="Пошук людей чи проектів" />
                    {/* <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} transition-all relative z-20 px-3 py-2 w-full outline-none focus:bg-white`} placeholder="Пошук ваших чатів та користувачів" /> */}
                    <div className="rounded-3xl mt-1.5 shadow-xl max-h-138 p-2 overflow-y-scroll absolute h-auto transition-all pt-9 top-0 w-full bg-white">
                        {findedUsers?.length > 0 ? (<p className="text-xl font-bold pt-2">Користувачі:</p>) : (null)}
                        {findedUsers ? (
                            findedUsers.map(({ item }) => {
                                return (
                                    <div key={item._id} onClick={() => { history.push(`/dashboard/userpage/${item._id}`); setsearchText("") }} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
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
                        {/* {findedUsersNProjects?.map(({ item }) => {
                            if (item.projectName) {
                                return (
                                    <div onClick={() => history.push(`/dashboard/projects/${item._id}`)} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                        <div className="flex items-center min-w-0">
                                            <div className="w-14 h-14 flex-shrink-0 rounded-xl relative responsive-image-bgImgUrl" style={{ backgroundImage: `url(${item.logoUrl[0]})` }}>
                                            </div>
                                            <div className="ml-2 truncate">
                                                <a className="font-semibold text-lg">{item.projectName}</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                <div onClick className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="w-14 h-14 rounded-full relative responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${item.avatarUrl})` }}>
                                        </div>
                                        <div className="ml-2 ">
                                            <a className="font-semibold text-lg block">{item.name}</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}
                    </div>
                </div>
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
