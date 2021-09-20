import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom'
import TeamMember from './TeamMember';
import ProjectsChat from './ProjectsChat';

export default function ProjectPage() {
    let { id } = useParams()
    const [Project, setProject] = useState()
    const [ProjectLeader, setProjectLeader] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [StyleForFundDiv, setStyleForFundDiv] = useState({})
    const history = useHistory()
    const [startDate, setStartDate] = useState()
    const [dateDifference, setDateDifference] = useState()

    useEffect(() => {
        const receivingExactProject = async () => {
            try {
                const payload = { id }
                const exactProject = await axios.post("/project/get-exact-projects", payload)
                setProject(exactProject.data[0])
                const date = new Date(exactProject.data[0].createdAt)
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let dt = date.getDate();

                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                setStartDate(year + '-' + month + '-' + dt)
                if (!exactProject.data[0].isProjectInfinite) {
                    const strtDate = new Date(year + '-' + month + '-' + dt)
                    const finishDate = new Date(exactProject.data[0].finishDate)
                    const diffTime = Math.abs(finishDate - strtDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    setDateDifference(diffDays)
                }

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
            <div>
                <div style={StyleForFundDiv} className="p-4 bg-white lg:fixed rounded-3xl mt-3 lg:mt-0 lg:rounded-r-3xl rounded-l-3xl overflow-y-scroll top-0 right-0 w-full lg:w-1/5">
                    <p className="text-2xl font-bold text-purple-950 text-center">Зібрано, грн</p>
                    <p className="text-2xl font-semibold mt-1">25 300</p>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-sm font-medium text-purple-950 text-center">Ціль проекта</p>
                        <p className="text-sm font-medium text-center">{Project.isFundsInfinite ? ("Необмежений збір") : (Project.fundsReqrd)}</p>
                    </div>
                    {Project.isProjectInfinite ? (
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm font-medium text-purple-950 text-center">Дата завершення</p>
                            <p className="text-sm font-medium text-center">{Project.isProjectInfinite ? ("Постійний проект") : (Project.finishDate)}</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-sm font-medium text-purple-950 text-center">Дата завершення</p>
                                <p className="text-sm font-medium text-center">{Project.isProjectInfinite ? ("Постійний проект") : (Project.finishDate)}</p>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-sm font-medium text-purple-950 text-center">Залишилось</p>
                                <p className="text-sm font-medium text-center">{dateDifference}</p>
                            </div>
                        </>
                    )}

                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm font-medium text-purple-950 text-center">Проект запущений</p>
                        <p className="text-sm font-medium text-center">{startDate}</p>
                    </div>
                    <button className="w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
                    <p className="font-medium text-lg text-gray-500 mt-3">Лідери проекту</p>
                    {/* leader profile */}
                    <div onClick={() => { history.push(`/dashboard/userpage/${ProjectLeader._id}/created-projects`) }} className="flex cursor-pointer w-full hover:shadow-inner p-2 shadow-none hover:bg-gray-100 rounded-3xl transition-all">
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
                    {Project.teamMembers.map(memberId => (
                        <div key={memberId}>
                            <TeamMember userId={memberId} />
                        </div>
                    ))}
                </div>

                <div className="bg-white order-1 rounded-3xl p-4">
                    <p className="text-2xl font-bold truncate w-full text-purple-950 text-center">{Project.projectName}</p>
                    <div className="font-medium text-lg w-full lg:w-6/12">
                        <p>Тип проекту: <strong className=" uppercase">{Project.category}</strong></p>
                        <p>Місце реалізації: <strong className=" uppercase">{Project.locationString}</strong></p>
                        <button className="w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
                    </div>
                    <p className="hidden lg:block font-medium text-lg mt-3 w-full whitespace-normal break-words">
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
                        <div className="mt-5">
                            <strong className=" font-semibold text-2xl">Короткий опис</strong><br />
                            {Project.description}
                        </div>
                        <div className="mt-5">
                            <strong className=" font-semibold text-2xl">Актуальність Проекту</strong><br />
                            {Project.projectRelevance}
                        </div>
                        <div className="mt-5">
                            <strong className=" font-semibold text-2xl">Передісторія</strong><br />
                            {Project.preHistory}
                        </div>
                        <div className="mt-5">
                            <strong className=" font-semibold text-2xl">План реалізації Проекту</strong><br />
                            {Project.projectPlan}
                        </div>
                        <div className="mt-5">
                            <strong className=" font-semibold text-2xl">Очікування</strong><br />
                            {Project.expectations}
                        </div>
                        <div className="mt-5">
                            <strong className=" font-semibold text-2xl">Плани витрат</strong><br />
                            {Project.spendingPlans}
                        </div>

                        <div className="w-full relative h-12">
                            <div className="absolute right-0">
                                <a href={Project.fileXLS} download className="px-3 py-2 mr-3 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl inline-flex text-lg font-medium text-purple-950">Завантажити презентацію Проекту <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg></a>
                                <a href={Project.filePDF} download className="px-3 py-2 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl inline-flex text-lg font-medium text-purple-950">Завантажити бюджет Проекту <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg></a>
                            </div>
                        </div>
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
                            <strong className=" font-semibold text-xl">Короткий опис</strong><br />
                            {Project.description}
                            <strong className=" font-semibold text-xl">Актуальність Проекту</strong><br />
                            {Project.projectRelevance}
                            <strong className=" font-semibold text-xl">Передісторія</strong><br />
                            {Project.preHistory}
                            <strong className=" font-semibold text-xl">План реалізації Проекту</strong><br />
                            {Project.projectPlan}
                            <strong className=" font-semibold text-xl">Очікування</strong><br />
                            {Project.expectations}
                            <strong className=" font-semibold text-xl">Плани витрат</strong><br />
                            {Project.spendingPlans}
                        </div>
                        <div className="flex relative text-right">
                            <div className="absolute inline-block">
                                <a href={Project.fileXLS} download className="px-3 py-2 mr-3 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl inline-flex text-lg font-medium text-purple-950">Завантажити презентацію Проекту</a>
                                <a href={Project.filePDF} download className="px-3 py-2 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl inline-flex text-lg font-medium text-purple-950">Завантажити бюджет Проекту</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col my-5">
                <div className="w-6/12 px-1">

                </div>
                <div className="w-6/12 px-1">
                    <ProjectsChat projectId={id} />
                </div>
            </div>
        </div>
    )
}
