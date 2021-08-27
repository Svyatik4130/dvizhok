import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Switch, Route, NavLink, useParams, useHistory } from "react-router-dom";
import CreatedProjectsByUser from './CreatedProjectsByUser';
import { useSelector } from 'react-redux';

export default function UserPage() {
    let { id } = useParams()
    const [UserInfo, setUserInfo] = useState()
    const userData = useSelector(state => state.userData)
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const receivingExactUser = async () => {
            try {
                const userInfoReq = await axios.post("/users/get-user", { id })
                setUserInfo(userInfoReq.data)

                setisLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        receivingExactUser()
    }, [])

    const CreateConversation = async () => {
        try {
            const payload = {
                senderId: userData.user.id,
                receiverId: id
            }
            const res = await axios.post("/conversations/add", payload)
            const conv_id = res.data._id
            history.push(`/dashboard/messages/${conv_id}`)
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (
            <div className="h-screen">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <div className="w-full flex">
            <div className="w-6/12 p-10">
                <div className="flex">
                    <div className="mb-1 lg:w-44 lg:h-44 h-28 w-28 mx-8 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${UserInfo.avatarUrl})` }}></div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="font-bold text-3xl text-purple-950">{UserInfo.name}</p>
                            {UserInfo.roleId === 0 ? (
                                <div>
                                    <div className="flex gap-1 my-3 items-center">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                    </div>
                                    <p className="text-lg font-bold inline-block text-purple-850">ОКтивіст</p>
                                </div>
                            ) : UserInfo.roleId === 1 ? (
                                <div>
                                    <div className="flex gap-1 my-3 items-center">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                    </div>
                                    <p className="text-lg font-bold inline-block text-purple-850">Творець</p>
                                </div>
                            ) : UserInfo.roleId === 2 ? (
                                <div>
                                    <div className="flex gap-1 my-3 items-center">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                    </div>
                                    <p className="text-lg font-bold inline-block text-purple-850">Лідер</p>
                                </div>
                            ) : (
                                null
                            )
                            }
                        </div>
                        {userData.user.id !== id ? (
                            <div className="inline-flex">
                                <p onClick={() => CreateConversation()} className="px-7 relative bottom-0 cursor-pointer bg-yellow-350 rounded-2xl font-semibold text-lg text-purple-950 hover:bg-yellow-400 transition-all py-2">Написати</p>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>

                <div className="mt-14">
                    <div className="flex items-center">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/globe.png" alt="globe" className="w-9" />
                        <p className="font-semibold text-2xl ml-2">Про себе</p>
                    </div>
                    <div className="flex items-center mt-7">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/portfolio.png" alt="portfolio" className="w-7" />
                        <p className="font-medium text-lg ml-2">Працює в OK Fund</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/university.png" alt="university" className="w-6" />
                        <p className="font-medium text-lg ml-2">Навчався в КНУ імені Тараса Шевченка</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/hometown.png" alt="hometown" className="w-6" />
                        <p className="font-medium text-lg ml-2">Живе в Київ</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/gps.png" alt="gps" className="w-6" />
                        <p className="font-medium text-lg ml-2">З Харкова</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/clock.png" alt="clock" className="w-6" />
                        <p className="font-medium text-lg ml-2">На Омріянїй Країні з 2007 року</p>
                    </div>

                    {/* social networks */}
                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/bankCard.png" alt="bankCard" className="w-6" />
                        <p className="font-medium text-lg ml-2">Інтернет ресурси:</p>
                    </div>
                    <div className="flex items-center ml-2 mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/facebook-notFilled.png" alt="facebook-notFilled" className="w-6" />
                        <p className="font-medium text-lg ml-2">https://www.facebook.com/oleksiy.tolkachov</p>
                    </div>

                    <div className="flex items-center mt-2">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/heart.png" alt="heart" className="w-6" />
                        <p className="font-medium text-lg ml-2">Місія: Зробити Світ кращим</p>
                    </div>
                </div>
            </div>
            <div className="w-6/12 pt-10 pr-8">
                <div className="w-full text-sm items-stretch flex rounded-t-xl font-medium lg:text-lg" style={{ backgroundColor: "#DDDDDD" }}>
                    <NavLink activeClassName="bg-white" to={`/dashboard/userpage/${id}/created-projects`} className="w-4/12 text-center py-2 rounded-tl-xl border-r-2">
                        Створив
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={`/dashboard/userpage/${id}/taking-part`} className="w-4/12 py-2 text-center  border-r-2">
                        Бере участь
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={`/dashboard/userpage/${id}/supported-projects`} className="w-4/12 text-center py-2 rounded-tr-xl">
                        Підтримав
                    </NavLink>
                </div>
                <div className="w-full bg-white rounded-b-xl p-2">
                    <Switch>
                        <Route path="/dashboard/userpage/:id/created-projects" children={<CreatedProjectsByUser />} />
                        <Route path="/dashboard/userpage/:id/taking-part">
                            <CreatedProjectsByUser />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
