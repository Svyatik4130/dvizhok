import React, { useEffect, useState } from 'react'
import ErrorNotice from '../../../misc/ErrorNotice';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'
import { Doughnut, defaults } from 'react-chartjs-2'
defaults.animation = false;

export default function ProjectList() {
    const [error, setError] = useState()
    const allProjects = useSelector(state => state.allProjects).sort((a, b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        return bDate.getTime() - aDate.getTime()
    })
    const history = useHistory()
    const [searchText, setSearchText] = useState('')
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")
    const [findedProjects, setFindedProjects] = useState(null)


    const sentToProjectPage = (id) => {
        history.push(`/dashboard/projects/${id}`)
    }

    useEffect(() => {
        const options = {
            minMatchCharLength: 3,
            keys: [
                "projectName"
            ]
        }
        const fuse = new Fuse(allProjects, options)
        const findedItems = fuse.search(searchText)
        setFindedProjects(findedItems)

        if (findedItems.length > 0) {
            setInputStyle("rounded-3xl bg-white")
        } else {
            setInputStyle("rounded-3xl bg-gray-100")
        }
    }, [searchText])

    return (
        <>
            <div className="px-12 m-auto">
                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
            </div>
            <div className="w-full h-full flex lg:flex-row flex-col ">
                <div className="lg:w-9/12 w-full order-2 lg:order-1 flex flex-wrap lg:overflow-y-scroll h-full lg:border-2 border-gray-300 rounded-xl">
                    {allProjects.map((project) => {
                        let raised = project.raised
                        let rqrd = project.fundsReqrd
                        if (project.isFundsInfinite) {
                            raised = 0
                            rqrd = 100
                        } 
                        let fundsLeft = Number(rqrd) - Number(raised)
                        if (fundsLeft < 0 ) {
                            fundsLeft = 0
                        }
                        const createdAt = new Date(project.createdAt?.substring(0, 10)).getTime()
                        const dateNow = new Date().getTime()
                        const finishDate = new Date(project.finishDate).getTime()
                        let remainTime = 100
                        let passedTime = 0
                        if (!project.isProjectInfinite) {
                            remainTime = finishDate - dateNow
                            passedTime = finishDate - createdAt - remainTime
                            if (remainTime < 0) {
                                remainTime = 0
                                passedTime = 100
                            }
                        }
                        const FundsOps = {
                            data: {
                                labels: ['Зібрано', 'Залишилося'],
                                datasets: [
                                    {
                                        data: [raised, fundsLeft],
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
                            <div className="h-124 lg:w-3/12 md:w-6/12 w-full md:p-1 p-2">
                                <div className="w-full h-full bg-white rounded-xl relative">
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
                                        <div className="w-full flex justify-evenly pb-2">
                                            <div className="lg:w-6/12 w-5/12 lg:border-r">
                                                <Doughnut {...FundsOps} />
                                                <p className="text-sm text-center">{project.isFundsInfinite ? (<>Необмежений збір</>) : (<> Зібрано </>)}</p>
                                            </div>
                                            <div className="lg:w-6/12 w-5/12 lg:border-l">
                                                <Doughnut {...KalendarOps} />
                                                <p className="text-sm text-center">{project.isProjectInfinite ? (<>Постійний<br /> проект</>) : (passedTime === 100 ? ("Закінчено") : (<> Днів до <br /> закінчення </>))}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="lg:w-3/12 w-full lg:pl-3 pl-0 pb-4 lg:pb-0 order-1 lg:order-2">
                    <div className="relative">
                        <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" className={`${inputStyle} w-full transition-all text-lg relative z-20 font-medium p-3 px-4 rounded-full outline-none focus:bg-white`} placeholder="Пошук проектів" />
                        <div className="rounded-3xl custom-shadow drop-shadow-lg mt-1.5 max-h-96 p-2 overflow-y-scroll absolute h-auto transition-all pt-9 top-0 w-full bg-white">
                            {findedProjects ? (
                                findedProjects.map(({ item }) => {
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
                                })
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
