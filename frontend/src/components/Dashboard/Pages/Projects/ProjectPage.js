import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom'
import TeamMember from './TeamMember';
import ProjectsChat from './ProjectsChat';
import Popup from 'reactjs-popup';
import ErrorNotice from '../../../misc/ErrorNotice';
import SuccessNotice from '../../../misc/SuccessNotice';
import { useDispatch, useSelector } from 'react-redux';
import { getSignature } from '../../../helpers/browser-key'
import { loggedUser } from '../../../../actions/UserActions'
import AdminPanel from './AdminPanel';
import ProjectsNews from './ProjectsNews';
import { addAllProjects } from '../../../../actions/ProjectActions'
import { addAllNotifications } from '../../../../actions/AddNotifications'
import { ReactPhotoCollage } from "react-photo-collage";
import Linkify from 'react-linkify';

export default function ProjectPage() {
    let { id } = useParams()
    const userData = useSelector(state => state.userData)
    const allProjects = useSelector(state => state.allProjects)
    const [Project, setProject] = useState(allProjects.filter(proj => proj._id === id)[0])
    const [followers, setFollowers] = useState(allProjects.filter(proj => proj._id === id)[0].followers)
    const [ProjectLeader, setProjectLeader] = useState()
    const [isLoading, setisLoading] = useState(true)
    const [StyleForFundDiv, setStyleForFundDiv] = useState({})
    const history = useHistory()
    const [startDate, setStartDate] = useState()
    const [dateDifference, setDateDifference] = useState()
    const [reqLoading, setreqLoading] = useState(false)
    const [amount, setAmount] = useState(0)
    const [successMessage, setSuccessMessage] = useState()
    const [error, setError] = useState()
    const [carouselClasses, setcarouselClasses] = useState({
        parent: "prpl-btns",
        item_expanded: false,
        item_wrapper: "px-8"
    })

    const members = Project.teamMembers.map(member => member)
    members.push(Project.projectleaderId)

    const signature = getSignature()
    const dispatch = useDispatch()

    useEffect(() => {
        const receivingExactProject = async () => {
            try {
                setisLoading(true)
                const exactProject = allProjects.filter(proj => proj._id === id)[0]
                const date = new Date(exactProject.createdAt)
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
                if (!exactProject.isProjectInfinite) {
                    const strtDate = new Date(year + '-' + month + '-' + dt)
                    const finishDate = new Date(exactProject.finishDate)
                    const diffTime = Math.abs(finishDate - strtDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    setDateDifference(diffDays)
                }

                const getProjectLeader = await axios.post("/users/get-leader", { id: exactProject.projectleaderId })
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
    }, [id])

    const handleAmountInputChange = (amount) => {
        if (amount > userData.user.balance) {
            setAmount(userData.user.balance)
        } else if (amount < 0) {
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

    const Support = async (closeFnc) => {
        try {
            let token = localStorage.getItem("auth-token")

            setreqLoading(true)
            const res = await axios.post("/project/raise", { amount: Number(amount), userId: userData.user.id, projectId: id, signature }, {
                headers: { "x-auth-token": token },
            })

            if (res.status === 200) {
                setSuccessMessage("Ви успішно підтримали проект!")
                dispatch(loggedUser({
                    token: res.data.token,
                    user: res.data.user
                }))

                let projetsWithNewBalance = allProjects
                projetsWithNewBalance[allProjects.findIndex(project => project._id === id)].raised += amount
                dispatch(addAllProjects(projetsWithNewBalance))

                const notification_payload = {
                    receiverIds: [Project.projectleaderId, ...Project.teamMembers],
                    type: "new_support",
                    text: `Проект "${Project.projectName}" підтримав "${userData.user.name}" на суму ${amount}грн.`,
                    link: id,
                    myId: userData.user.id
                }
                await axios.post("/notifications/add-multiple", notification_payload)

                setTimeout(() => {
                    closeFnc()
                }, 1500);
            }
            setreqLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const notificationCheck = async () => {
            let token = localStorage.getItem("auth-token")
            const Notifications = await axios.post("/notifications/read-supports", { url: id }, { headers: { "x-auth-token": token, "secret": signature } })
            dispatch(addAllNotifications(Notifications.data))
        }
        notificationCheck()
    }, [])

    const Follow = async () => {
        try {
            const payload = { followers, userId: userData.user.id, projectId: id }
            const res = await axios.post("/project/follow", payload)
            setFollowers(res.data)
            let Projects = allProjects
            const index = allProjects.findIndex(project => project._id === id)
            allProjects[index].followers = res.data
            dispatch(addAllProjects(Projects))
        } catch (error) {
            console.log(error)
        }
    }

    const expandCarousel = () => {
        setcarouselClasses({
            parent: "prpl-btns-big fixed bg-black bg-opacity-60 w-full h-screen top-0 right-0 z-50",
            item_expanded: true,
            item_wrapper: "h-screen flex items-center justify-center px-48"
        })
    }
    const closeCarousel = () => {
        setcarouselClasses({
            parent: "prpl-btns",
            item_expanded: false,
            item_wrapper: "px-8"
        })
    }

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} className="link" target="_blank">
            {text}
        </a>
    )

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
                    <p className="text-2xl font-semibold mt-1">{Project.raised}</p>
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
                                <p className="text-sm font-medium text-purple-950 text-center">Залишилось днів</p>
                                <p className="text-sm font-medium text-center">{dateDifference}</p>
                            </div>
                        </>
                    )}

                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm font-medium text-purple-950 text-center">Проект запущений</p>
                        <p className="text-sm font-medium text-center">{startDate}</p>
                    </div>
                    <Popup
                        trigger={
                            <button className="w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
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
                                    Вікно підтримки проекту
                                </div>

                                <div className="w-10/12 mt-3 m-auto">
                                    <div className="px-2 m-auto">
                                        {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                        {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                    </div>
                                </div>

                                <p className="font-medium text-lg px-5 mt-4 text-gray-600">Будь ласка, виберіть суму оплати</p>
                                <div className="w-full m-auto flex items-center p-6">
                                    <input value={amount} onChange={(e) => handleAmountInputChange(e.target.value)} type="number" min="0" max={userData.user.balance} className="h-8 w-6/12 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" /><br />
                                    <p className=" pl-2 font-medium text-xl">грн</p>
                                </div>
                                <div className="w-full rounded-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                    {reqLoading ? (
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                    ) : (
                                        null
                                    )}
                                    <button onClick={() => Support(close)} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-yellow-350 text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Підтримати</button>
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
                    <p className="font-medium hidden lg:block text-lg text-gray-500 mt-3">Лідери проекту</p>
                    {/* leader profile */}
                    <div onClick={() => { history.push(`/dashboard/userpage/${ProjectLeader._id}/created-projects`) }} className="hidden lg:flex cursor-pointer w-full hover:shadow-inner p-2 shadow-none hover:bg-gray-100 rounded-3xl transition-all">
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
                        <div className="hidden lg:block" key={memberId}>
                            <TeamMember userId={memberId} />
                        </div>
                    ))}
                </div>

                <div className="bg-white order-1 mt-2 lg:mt-0 rounded-3xl p-4">
                    {members.includes(userData.user.id) && userData.user.role >= 1 ? (
                        <AdminPanel projectInfo={Project} setProjectFnc={setProject} />
                    ) : (null)}

                    <p className="text-2xl font-bold truncate w-full text-purple-950 text-center">{Project.projectName}</p>
                    <div className="font-medium text-lg w-full lg:w-6/12">
                        <p>Тип проекту: <strong className=" uppercase">{Project.category.join(", ")}</strong></p>
                        <p>Місце реалізації: <strong className=" uppercase">{Project.locationString}</strong></p>
                        <div className="flex lg:flex-row flex-col justify-evenly">
                            <button onClick={() => Follow()} className={`lg:w-5/12 w-full mt-3 ${followers.includes(userData.user.id) ? ("bg-white") : ("bg-yellow-350")} hover:bg-yellow-350 hover:bg-opacity-50 border-2 transition-all border-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center`}>{followers.includes(userData.user.id) ? ("Відписатися") : ("Підписатися")}</button>
                            <Popup
                                trigger={
                                    <button className="lg:w-5/12 w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
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
                                            Вікно підтримки проекту
                                        </div>

                                        <div className="w-10/12 mt-3 m-auto">
                                            <div className="px-2 m-auto">
                                                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                                {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                            </div>
                                        </div>

                                        <p className="font-medium text-lg px-5 mt-4 text-gray-600">Будь ласка, виберіть суму оплати</p>
                                        <div className="w-full m-auto flex items-center p-6">
                                            <input value={amount} onChange={(e) => handleAmountInputChange(e.target.value)} type="number" min="0" max={userData.user.balance} className="h-8 w-6/12 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" /><br />
                                            <p className=" pl-2 font-medium text-xl">грн</p>
                                        </div>
                                        <div className="w-full rounded-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                            {reqLoading ? (
                                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                            ) : (
                                                null
                                            )}
                                            <button onClick={() => Support(close)} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-yellow-350 text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Підтримати</button>
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
                        </div>
                    </div>
                    <p className="hidden lg:block font-medium text-lg mt-3 w-full whitespace-normal break-words">
                        <div className="float-right w-6/12 h-64 -mt-28">

                            {carouselClasses.item_expanded && (
                                <div onClick={() => closeCarousel()} className="fixed top-0 right-0 m-4 mr-14 rounded-full bg-gray-700 bg-opacity-80 hover:bg-opacity-100 hover:bg-gray-900 transition-all p-1 cursor-pointer" style={{ zIndex: 60 }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </div>
                            )}
                            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className={`pl-3 ${carouselClasses.parent} transition-all`}>
                                {Project.photosNvideos.map((source) => {
                                    const ext = source.split('.')[source.split('.').length - 1]
                                    if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
                                        return (
                                            <>
                                                {carouselClasses.item_expanded && (<div onClick={() => closeCarousel()} style={{ zIndex: 55 }} className="absolute h-screen top-0 right-0 w-full"></div>)}
                                                <div className={`pb-9 ${carouselClasses.item_wrapper} transition-all`}>
                                                    {carouselClasses.item_expanded ? (
                                                        <div className="flex h-full z-100">
                                                            <img src={source} className={`object-contain relative`} style={{ zIndex: 60 }} />
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => expandCarousel()} className="mb-9 mx-8 h-56 responsive-image-bgImgUrl cursor-pointer" style={{ backgroundImage: `url(${source})` }}></div>
                                                    )}
                                                </div>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                {carouselClasses.item_expanded && (<div onClick={() => closeCarousel()} style={{ zIndex: 55 }} className="absolute h-screen top-0 right-0 w-full"></div>)}
                                                <div className={`pb-9 ${carouselClasses.item_wrapper}`}>
                                                    <video controls>
                                                        <source src={source} key={source}></source>
                                                        Your browser does not support HTML5 video.
                                                    </video>
                                                </div>
                                            </>
                                        )
                                    }
                                })}
                            </Carousel>
                        </div>
                        <Linkify componentDecorator={componentDecorator}>
                            <div className="mt-5">
                                <strong className=" font-semibold text-2xl">Короткий опис</strong><br />
                                {Project.description}
                            </div>
                            <div className="mt-5 whitespace-pre-line">
                                <strong className=" font-semibold text-2xl">Актуальність Проекту</strong><br />
                                {Project.projectRelevance}
                            </div>
                            <div className="mt-5 whitespace-pre-line">
                                <strong className=" font-semibold text-2xl">Передісторія</strong><br />
                                {Project.preHistory}
                            </div>
                            <div className="mt-5 whitespace-pre-line">
                                <strong className=" font-semibold text-2xl">План реалізації Проекту</strong><br />
                                {Project.projectPlan}
                            </div>
                            <div className="mt-5 whitespace-pre-line">
                                <strong className=" font-semibold text-2xl">Очікування</strong><br />
                                {Project.expectations}
                            </div>
                            <div className="mt-5 whitespace-pre-line">
                                <strong className=" font-semibold text-2xl">Плани витрат</strong><br />
                                {Project.spendingPlans}
                            </div>
                        </Linkify>

                        <div className="w-full relative h-12">
                            <div className="absolute right-0">
                                <a href={Project.filePDF} download className="px-3 py-2 mr-3 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl inline-flex text-lg font-medium text-purple-950">Завантажити презентацію Проекту <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg></a>
                                <a href={Project.fileXLS} download className="px-3 py-2 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl inline-flex text-lg font-medium text-purple-950">Завантажити бюджет Проекту <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg></a>
                            </div>
                        </div>
                    </p>

                    {/* responsive mob design */}
                    <div className="w-full lg:hidden ">
                        <div>
                            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns pt-3 pl-3">
                                {Project.photosNvideos.map((source) => {
                                    const ext = source.split('.')[source.split('.').length - 1]
                                    const setting = {
                                        width: '600',
                                        height: ['250px', '170px'],
                                        layout: [1],
                                        photos: [
                                            { source }
                                        ],
                                        showNumOfRemainingPhotos: true
                                    };

                                    if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
                                        return (
                                            <>
                                                <div className="px-8" >
                                                    <ReactPhotoCollage {...setting} />
                                                </div>
                                                <div className="mb-9"></div>
                                            </>
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
                            <Linkify componentDecorator={componentDecorator}>
                                <strong className=" font-semibold text-xl whitespace-pre-line">Короткий опис</strong><br />
                                {Project.description}<br /><br />
                                <strong className=" font-semibold text-xl whitespace-pre-line">Актуальність Проекту</strong><br />
                                {Project.projectRelevance}<br /><br />
                                <strong className=" font-semibold text-xl whitespace-pre-line">Передісторія</strong><br />
                                {Project.preHistory}<br /><br />
                                <strong className=" font-semibold text-xl whitespace-pre-line">План реалізації Проекту</strong><br />
                                {Project.projectPlan}<br /><br />
                                <strong className=" font-semibold text-xl whitespace-pre-line">Очікування</strong><br />
                                {Project.expectations}<br /><br />
                                <strong className=" font-semibold text-xl whitespace-pre-line">Плани витрат</strong><br />
                                {Project.spendingPlans}<br /><br />
                            </Linkify>
                        </div>
                        <div className="relative flex flex-col gap-2 text-center">
                            <a href={Project.fileXLS} download className="px-3 py-2 mr-3 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl flex text-lg font-medium text-purple-950">Завантажити презентацію <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg></a>
                            <a href={Project.filePDF} download className="px-3 py-2 cursor-pointer bg-yellow-350 hover:bg-yellow-300 transition-all rounded-2xl flex text-lg font-medium text-purple-950">Завантажити бюджет Проекту <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden p-4 bg-white rounded-3xl mt-3 lg:mt-0 lg:rounded-r-3xl rounded-l-3xl overflow-y-scroll top-0 right-0 w-full lg:w-1/5">
                <p className="font-medium lg:hidden text-lg text-gray-500 mt-3">Лідери проекту</p>
                {/* leader profile */}
                <div onClick={() => { history.push(`/dashboard/userpage/${ProjectLeader._id}/created-projects`) }} className="flex lg:hidden cursor-pointer w-full hover:shadow-inner p-2 shadow-none hover:bg-gray-100 rounded-3xl transition-all">
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
            <div className="flex lg:flex-row flex-col my-5">
                <div className="lg:w-6/12 w-full order-2 lg:order-1 mt-1 lg:mt-0 px-1">
                    <ProjectsNews projId={id} />
                </div>
                <div className="lg:w-6/12 w-full order-1 lg:order-2  px-1">
                    <ProjectsChat projectId={id} />
                </div>
            </div>
        </div>
    )
}
