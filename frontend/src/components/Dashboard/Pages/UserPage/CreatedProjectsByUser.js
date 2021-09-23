import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Doughnut } from 'react-chartjs-2'

export default function CreatedProjectsByUser() {
    let { id } = useParams()
    const [CreatedProjects, setCreatedProjects] = useState()
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const oppsBeforeMount = async () => {
            const getCreatedProjects = await axios.post("/project/get-created-projects-by-user", { id })
            setCreatedProjects(getCreatedProjects.data)
            console.log(getCreatedProjects.data)
            setisLoading(false)
        }
        oppsBeforeMount()
    }, [])

    const sentToProjectPage = (id) => {
        history.push(`/dashboard/projects/${id}`)
    }

    if (isLoading) {
        return <SimpleLoader />
    }

    return (
        <div className="flex flex-wrap">
            {CreatedProjects ? (null) : (
                <div className="w-full opacity-50">
                    <div className="">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                        <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Користувач ще не створив жодного проекту</p>
                    </div>
                </div>
            )}
            {CreatedProjects.map((project) => {
                let raised = project.raised
                let rqrd = project.fundsReqrd
                if (project.isFundsInfinite) {
                    raised = 0
                    rqrd = 100
                }
                const createdAt = new Date(project.createdAt?.substring(0, 10)).getTime()
                const dateNow = new Date().getTime()
                const finishDate = new Date(project.finishDate).getTime()
                let remainTime = 100
                let passedTime = 0
                if (!project.isProjectInfinite) {
                    remainTime = finishDate - dateNow
                    passedTime = finishDate - createdAt - remainTime
                }
                const FundsOps = {
                    data: {
                        labels: ['Зібрано', 'Залишилося'],
                        datasets: [
                            {
                                data: [raised, Number(rqrd) - Number(raised)],
                                backgroundColor: ['#48004B', '#B8B8B8'],
                            },
                        ]
                    },
                    options: {
                        responsive: true,
                        cutoutPercentage: 80,
                    },
                    legend: {
                        display: false,
                    },
                }
                const KalendarOps = {
                    data: {
                        labels: ['Пройшло', 'Залишилося'],
                        datasets: [
                            {
                                data: [Number(passedTime), Number(remainTime)],
                                backgroundColor: ['#48004B', '#B8B8B8'],
                            },
                        ]
                    },
                    options: {
                        responsive: true,
                        cutoutPercentage: 80,
                    },
                    legend: {
                        display: false,
                    },
                }
                return (
                    <div className="h-124 lg:w-4/12 md:w-6/12 w-full md:p-1 p-2">
                        <div className="w-full h-full bg-white custom-shadow rounded-xl relative">
                            <div className="flex h-full flex-col justify-between">
                                <div>
                                    <div onClick={() => sentToProjectPage(project._id)} className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">{project.category}</p>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <a onClick={() => sentToProjectPage(project._id)} className="font-semibold projectName-text cursor-pointer underline text-sm mb-1 break-words">{project.projectName}</a>
                                        <p className="font-medium text-xs overflow-y-scroll break-words h-32">{project.description}</p>
                                    </div>
                                </div>
                                <div className="w-full flex pb-2">
                                    <div className="w-6/12 border-r">
                                        <Doughnut {...FundsOps} />
                                        <p className="text-sm text-center">{project.isFundsInfinite ? (<>Необмежений збір</>) : (<> Зібрано </>)}</p>
                                    </div>
                                    <div className="w-6/12 border-l">
                                        <Doughnut {...KalendarOps} />
                                        <p className="text-sm text-center">{project.isProjectInfinite ? (<>Постійний<br /> проект</>) : (<> Днів до <br /> закінчення </>)}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
