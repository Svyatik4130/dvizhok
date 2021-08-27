import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom'

export default function ProjectPage() {
    let { id } = useParams()
    const [Project, setProject] = useState()
    const [ProjectLeader, setProjectLeader] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [StyleForFundDiv, setStyleForFundDiv] = useState({})
    const history = useHistory()

    useEffect(() => {
        const receivingExactProject = async () => {
            try {
                const payload = { id }
                const exactProject = await axios.post("/project/get-exact-projects", payload)
                setProject(exactProject.data[0])

                const getProjectLeader = await axios.post("/users/get-leader", { id: exactProject.data[0].projectleaderId })
                setProjectLeader(getProjectLeader.data)

                setisLoading(false)
            } catch (error) {
                console.log(error)
            }

            if (window.screen.width >= 1024) {
                setStyleForFundDiv({ height: window.innerHeight - 96, marginTop: "96px" })
            }
        }
        receivingExactProject()
    }, [])

    if (isLoading) {
        return (
            <div className="h-screen">
                <SimpleLoader />
            </div>
        )
    }
    return (
        <div className="lg:w-4/5 overflow-y-scroll flex flex-col lg:pr-8 pr-0 w-full">
            <div style={StyleForFundDiv} className="lg:fixed order-2 p-4 rounded-3xl mt-3 lg:mt-0 lg:rounded-r-3xl rounded-l-3xl overflow-y-scroll bg-white top-0 right-0 w-full lg:w-1/5">
                <p className="text-2xl font-bold text-purple-950 text-center">Зібрано, грн</p>
                <p className="text-2xl font-semibold mt-1">25 300</p>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-sm font-medium text-purple-950 text-center">Ціль проекта</p>
                    <p className="text-sm font-medium text-center">200 000 грн</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-sm font-medium text-purple-950 text-center">Залишилось</p>
                    <p className="text-sm font-medium text-center">215 днів</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-sm font-medium text-purple-950 text-center">Проект запущений</p>
                    <p className="text-sm font-medium text-center">23.04.2017</p>
                </div>
                <button className="w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
                <p className="font-medium text-lg text-gray-500 mt-3">Лідери проекту</p>
                {/* leader profile */}
                <div onClick={() => {
                    history.push(`/dashboard/userpage/${ProjectLeader._id}/created-projects`)
                }} className="flex cursor-pointer w-full hover:shadow-inner p-2 shadow-none hover:bg-gray-100 rounded-3xl transition-all">
                    <div className="h-14  w-14 rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${ProjectLeader.avatarUrl})` }}></div>
                    <div className="ml-2">
                        <p className="font-semibold text-lg text-gray-700">{ProjectLeader.name}</p>
                        <div className="flex">
                            {ProjectLeader.roleId === 0 ? (
                                <div className="flex gap-1 items-center">
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                    <p className="text-lg ml-3 font-bold inline-block text-purple-850">ОКтивіст</p>
                                </div>
                            ) : ProjectLeader.roleId === 1 ? (
                                <div className="flex gap-1 items-center">
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="w-7" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="w-7" />
                                    <p className="text-lg ml-3 font-bold inline-block text-purple-850">Творець</p>
                                </div>
                            ) : ProjectLeader.roleId === 2 ? (
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

            <div className="bg-white order-1 rounded-3xl p-4">
                <p className="text-2xl font-bold text-purple-950 text-center">{Project.projectName}</p>
                <div className="font-medium text-lg w-full lg:w-6/12">
                    <p>Тип проекту: <strong className=" uppercase">{Project.category}</strong></p>
                    <p>Місце реалізації: <strong className=" uppercase">{Project.category}</strong></p>
                    <button className="w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
                </div>
                <div className="float-right w-6/12 -mt-28">
                    <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns pl-3">
                        {Project.photosNvideos.map((source) => {
                            const ext = source.split('.')[source.split('.').length - 1]
                            if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
                                return (
                                    <div className="mb-9 mx-8 h-56 responsive-image-bgImgUrl" style={{ backgroundImage: `url(${source})` }}>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="pb-9 px-8">
                                        <video controls>
                                            <source src={source} key={source}></source>
                                            Your browser does not support HTML5 video.
                                        </video>
                                    </div>
                                )
                            }
                        })}
                    </Carousel>
                </div>
                <p className="hidden lg:block font-medium mt-3 w-full whitespace-normal break-words">
                    <strong className=" font-semibold text-2xl">ІСТОРІЯ</strong><br />
                    {Project.description}
                </p>

                {/* responsive mob design */}
                <div className="w-full lg:hidden">
                    <div>
                        <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns pl-3">
                            {Project.photosNvideos.map((source) => {
                                const ext = source.split('.')[source.split('.').length - 1]
                                if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
                                    return (
                                        <div className="mb-9 mx-8 h-56 responsive-image-bgImgUrl" style={{ backgroundImage: `url(${source})` }}>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="pb-9 px-8">
                                            <video controls>
                                                <source src={source} key={source}></source>
                                                Your browser does not support HTML5 video.
                                            </video>
                                        </div>
                                    )
                                }
                            })}
                        </Carousel>
                    </div>
                    <div className="break-words">
                        <strong className=" font-semibold text-xl">ІСТОРІЯ</strong><br />
                        {Project.description}
                    </div>
                </div>
            </div>
        </div>
    )
}
