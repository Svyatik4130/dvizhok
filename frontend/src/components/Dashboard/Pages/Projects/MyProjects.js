import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Fuse from 'fuse.js'
import { Doughnut, defaults } from 'react-chartjs-2'
defaults.animation = false;

export default function MyProjects() {
    let { id } = useParams()
    const myProjects = useSelector(state => state.myProjects).sort((a, b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        return bDate.getTime() - aDate.getTime()
    })
    const history = useHistory()
    const [searchText, setSearchText] = useState('')
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")
    const [findedProjects, setFindedProjects] = useState(null)
    const [classnameLinkShare, setclassnameLinkShare] = useState("")

    useEffect(() => {
        const options = {
            minMatchCharLength: 3,
            keys: [
                "projectName"
            ]
        }
        const fuse = new Fuse(myProjects, options)
        const findedItems = fuse.search(searchText)
        setFindedProjects(findedItems)

        if (findedItems.length > 0) {
            setInputStyle("rounded-3xl bg-white")
        } else {
            setInputStyle("rounded-3xl bg-gray-100")
        }
    }, [searchText])

    const sentToProjectPage = (id) => {
        history.push(`/dashboard/projects/${id}`)
    }

    return (
        <div className="w-full h-full flex lg:flex-row flex-col">
            <div className="lg:w-9/12 w-full order-2 lg:order-1 flex flex-wrap lg:overflow-y-scroll h-full lg:border-2 border-purple-200 rounded-xl">

                {myProjects.filter(proj => proj._id === id).length > 0 && (
                    <>
                        <div onClick={() => history.push("/dashboard/projects/myprojects")} className="fixed top-0 left-0 w-full z-50 h-screen bg-black bg-opacity-50"></div>
                        <div className="absolute w-11/12 lg:w-auto z-100 left-2/4 top-1/3">
                            <div className='inline-flex relative -left-2/4'>
                                <div className="modal bg-white m-auto rounded-xl max-h-screen">
                                    <div className="w-full bg-gray-100 px-4 py-2 text-black text-2xl font-bold rounded-t-xl">
                                        Вітаємо, ви опублікували проект
                                    </div>
                                    <div className="px-8 pt-3 z-40">
                                        <button onClick={() => { navigator.clipboard.writeText(`http://31.131.24.170/guest/projects/${id}`); setclassnameLinkShare("animate-jump"); setTimeout(() => { setclassnameLinkShare("") }, 700); }} className={`px-4 py-3 flex gap-2 items-center rounded-3xl m-4 text-purple-950 bg-yellow-350 font-medium ${classnameLinkShare}`}><svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" /></svg>Поділіться посиланням на свій проект з друзями, щоб зібрати підтримку</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {
                    myProjects[0] === undefined ? (
                        <div className="w-full h-full relative opacity-50">
                            <div className="absolute w-6/7 lg:w-auto center-content">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                                <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Ви ще не створили жодного проекту. Станьте Творцем і створіть свій проект!</p>
                            </div>
                        </div>
                    ) : (
                        myProjects.map((project) => {
                            let raised = project.raised
                            let rqrd = project.fundsReqrd
                            if (project.isFundsInfinite) {
                                raised = 0
                                rqrd = 100
                            }
                            let fundsLeft = Number(rqrd) - Number(raised)
                            if (fundsLeft < 0) {
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
                                    events: [],
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
                                    events: [],
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
                                                <div onClick={() => sentToProjectPage(project._id)} className="responsive-image-bgImgUrl-cover cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
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
                                                    <p className="text-sm text-center">{project.isProjectInfinite ? (<>Постійний<br /> проект</>) : (passedTime === 100 ? ("Закінчено") : (<> Днів до <br /> закінчення </>))}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            <div className="lg:w-3/12 w-full lg:pl-3 pl-0 pb-4 lg:pb-0 order-1 lg:order-2">
                <div className="relative">
                    <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" className={`${inputStyle} w-full transition-all text-lg relative z-20 font-medium p-3 px-4 rounded-full outline-none focus:bg-white`} placeholder="Пошук проектів" />
                    {/* <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} transition-all relative z-20 px-3 py-2 w-full outline-none focus:bg-white`} placeholder="Пошук ваших чатів та користувачів" /> */}
                    <div className="rounded-3xl drop-shadow-lg mt-1.5 max-h-96 p-2 overflow-y-scroll absolute h-auto transition-all pt-9 top-0 w-full bg-white">
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
        </div >
    )
}
