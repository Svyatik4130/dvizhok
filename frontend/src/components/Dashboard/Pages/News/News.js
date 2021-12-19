import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import EventCard from './EventCard';
import SidebarEventAlert from './SidebarEventAlert';
import NewsNearMe from './NewsNearMe';
import Popup from 'reactjs-popup';
import SuccessNotice from '../../../misc/SuccessNotice';
import ErrorNotice from '../../../misc/ErrorNotice';
import SearchBar from '../Projects/SearchBar';
import {
    useLoadScript
} from "@react-google-maps/api";
import SimpleLoader from '../../../Loaders/SimpleLoader';
import "@reach/combobox/styles.css";
import { getSignature } from '../../../helpers/browser-key'
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import AnnouncementsNearMe from './AnnouncementsNearMe';
import TopPeaceOfNews from './TopPeaceOfNews';

export default function News() {
    const userData = useSelector(state => state.userData)
    const myProjects = useSelector(state => state.myProjects)
    const allProjects = useSelector(state => state.allProjects)
    const [error, setError] = useState()
    const [isLodaing, setisLodaing] = useState(true)
    const [successMessage, setSuccessMessage] = useState()
    const [reqLoading, setreqLoading] = useState(false)
    const [desc, setDesc] = useState("")
    const [detectedLink, setDetectedLink] = useState()
    const [linkDetails, setlinkDetails] = useState()

    const [news, setNews] = useState()
    const [followedNews, setfollowedNews] = useState()
    const [advrts, setAdvrts] = useState()
    const [advrtForMob, setadvrtForMob] = useState()
    const [allAdvrts, setallAdvrts] = useState()

    const [selectedFiles, setselectedFiles] = useState("")
    const [htmlImages, sethtmlImages] = useState([])

    const [Location, setLocation] = useState()
    const [locationString, setLocationString] = useState()
    const [libraries] = useState(['places']);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });


    const signature = getSignature()

    const [selectedProject, setselectedProject] = useState(myProjects[0])
    const [isListExpanded, setisListExpanded] = useState(false)
    const [listIconDegree, setlistIconDegree] = useState("0")
    const [test, settest] = useState()
    const toggleMyProjectsList = () => {
        setisListExpanded(!isListExpanded)
        if (isListExpanded) {
            setlistIconDegree("0")
        } else {
            setlistIconDegree("180")
        }
    }

    const [randomProjects, setRandomProjects] = useState(allProjects.sort(() => Math.random() - Math.random()).slice(0, 10))

    const multipleFileChangedHandler = (event) => {
        setselectedFiles(event.target.files)
    }
    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            if (index > 3) return null
            if (photo.includes("video")) {
                const video = photo.slice(0, -5)
                return (
                    <div key={index} >
                        <video id={`video-element-${index}`} controls>
                            <source src={video}></source>
                            Your browser does not support HTML5 video.
                        </video>
                    </div>
                )
            } else {
                return (
                    <img src={photo} key={photo} />
                )
            }
        })
    }
    function ProcessFiles(e) {
        sethtmlImages([])
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map((file) => {
                if (file.type.includes("video")) {
                    return URL.createObjectURL(file) + "video"
                }
                return URL.createObjectURL(file)
            })
            sethtmlImages((prevImages) => prevImages.concat(fileArr))
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }

    const saveStory = async (close) => {
        try {
            setError('')
            setreqLoading(true)

            if (selectedFiles) {
                if (desc.length < 5) {
                    setError(`Довжина тексту новини повинна бути від 5 до 1000 символів. Зараз:${desc.length}`)
                    setreqLoading(false)
                    return
                }
                if (!locationString || !Location) {
                    setError(`Введіть локацію новини`)
                    setreqLoading(false)
                    return
                }
                const data = new FormData();

                for (let i = 0; i < selectedFiles.length; i++) {
                    if (i < 4) {
                        data.append('galleryImage', selectedFiles[i]);
                    }
                }

                data.append('projectId', selectedProject._id)
                data.append('projectLogo', selectedProject.logoUrl[0])
                data.append('projectName', selectedProject.projectName)
                data.append('publisherId', userData.user.id)
                data.append('storyType', "news")
                data.append('text', desc)
                data.append('location', Location)
                data.append('locationString', locationString)
                data.append('secret', signature);

                let AreExtsSuitable = true
                for (let i = 0; i < selectedFiles.length; i++) {
                    if (i < 4) {
                        if (!(/(jpe?g|png|mp4|mov)$/i).test(selectedFiles[i].name.split('.').pop())) {
                            AreExtsSuitable = false
                        }
                    }
                }
                if (!AreExtsSuitable) {
                    setError('Неприпустимий формат загружаеммого контенту, дозволені розширення: .png, .jpg, .jpeg, .mov, .mp4');
                    setreqLoading(false)
                    return
                }

                let token = localStorage.getItem("auth-token")
                const publishRes = await axios.post('/story/create-story', data, {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': 'multipart/form-data',
                        'location': `images/projects/story`,
                        "x-auth-token": token,
                    }
                })
                if (publishRes.status === 200) {
                    setreqLoading(false)
                    setDesc()
                    setselectedFiles()
                    setLocation()
                    setLocationString()
                    setSuccessMessage("Ви успішно опублікували новину")
                    setTimeout(() => {
                        close()
                        setSuccessMessage()
                    }, 1500);
                }
                console.log(publishRes.data)
            } else {
                if (desc.length < 5) {
                    setError(`Довжина тексту новини повинна бути від 5 до 1000 символів. Зараз:${desc.length}`)
                    setreqLoading(false)
                    return
                }
                if (!locationString || !Location) {
                    setError(`Введіть локацію новини`)
                    setreqLoading(false)
                    return
                }
                let token = localStorage.getItem("auth-token")
                const payload = {
                    "projectId": selectedProject._id,
                    "projectLogo": selectedProject.logoUrl[0],
                    "projectName": selectedProject.projectName,
                    "publisherId": userData.user.id,
                    "storyType": "news",
                    "text": desc,
                    "location": Location,
                    "locationString": locationString,
                    "previev_image": linkDetails?.images?.[0]
                }
                const publishRes = await axios.post('/story/create-story-noPhoto', payload, { headers: { "x-auth-token": token, "secret": signature } })

                if (publishRes.status === 200) {
                    setreqLoading(false)
                    setDesc()
                    setselectedFiles()
                    setLocation()
                    setLocationString()
                    setSuccessMessage("Ви успішно опублікували новину")
                    setTimeout(() => {
                        close()
                        setSuccessMessage()
                    }, 1500);
                }
            }
        } catch (error) {
            console.log(error)
            setreqLoading(false)
            if (error?.response?.data) setError(error.response.data.msg)
        }
    }

    useEffect(() => {
        const preloadOpps = async () => {
            setisLodaing(true)
            try {
                const res = await axios.get("/story/get-all-stories")
                const sortedNews = res.data.filter(story => story.storyType === "news").sort((a, b) => {
                    const aDate = new Date(a.createdAt)
                    const bDate = new Date(b.createdAt)
                    return bDate.getTime() - aDate.getTime()
                })
                setNews(sortedNews)
                const resFollowed = await axios.get(`/project/get-followed-ids/${userData.user.id}`)
                const onlyFollowedNews = sortedNews.filter(news => resFollowed.data.includes(news.projectId))
                setfollowedNews(onlyFollowedNews)

                if (onlyFollowedNews.length > 0) {
                    settest(onlyFollowedNews.map(story => {
                        return <EventCard story={story} />
                    }))
                } else {
                    settest(
                        <div className="w-full opacity-50">
                            <div className="">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                                <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Ви ще не стежите за жодним проектом або проект не опублікував жодної новини. Підписуйтесь та підтримуйте проекти, і ви будете бачити їхні новини</p>
                            </div>
                        </div>
                    )
                }

                let sortedAdvrts = []
                const Advts = res.data.filter(announcement => announcement.storyType === "announcement").filter(announcement => resFollowed.data.includes(announcement.projectId)).sort((a, b) => {
                    const aDate = new Date(a.startDate)
                    const bDate = new Date(b.startDate)
                    return aDate.getTime() - bDate.getTime()
                })
                const AllAdvrts = res.data.filter(announcement => announcement.storyType === "announcement").sort((a, b) => {
                    const aDate = new Date(a.startDate)
                    const bDate = new Date(b.startDate)
                    return aDate.getTime() - bDate.getTime()
                })
                setallAdvrts(AllAdvrts)
                Advts.forEach(advrt => {
                    const startDate = new Date(advrt.startDate)
                    const name_date = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
                    const alreadyExistsINdex = sortedAdvrts.findIndex(dateWithEvents => dateWithEvents.dateString === name_date)
                    if (alreadyExistsINdex === -1) {
                        sortedAdvrts.push({ dateString: name_date, events: [], startDate })
                    }
                    sortedAdvrts[sortedAdvrts.length - 1].events.push(advrt)
                })
                const futureOnlyEvents = sortedAdvrts.filter(event => {
                    const dateNow = new Date()
                    const eventDate = new Date(event.startDate)
                    return dateNow.getTime() <= eventDate.getTime()
                })
                const advrForMobile = []
                const advrForMobile3together = []
                futureOnlyEvents.forEach(date => {
                    date.events.map(announcement => {
                        advrForMobile.push({ announcement, date: date.dateString })
                    })
                })
                for (let index = 0; advrForMobile3together?.[advrForMobile3together.length - 1]?.[advrForMobile3together?.[advrForMobile3together.length - 1].length - 1]?.announcement?._id !== advrForMobile?.[advrForMobile.length - 1]?.announcement?._id; index += 3) {
                    const together3 = []
                    together3.push(advrForMobile[index])
                    if (advrForMobile[index + 1]) together3.push(advrForMobile[index + 1])
                    if (advrForMobile[index + 2]) together3.push(advrForMobile[index + 2])
                    advrForMobile3together.push(together3)
                }
                setAdvrts(futureOnlyEvents)
                setadvrtForMob(advrForMobile3together)
            } catch (error) {
                console.log(error)
            }
            setisLodaing(false)
        }
        preloadOpps()
    }, [successMessage])

    useEffect(() => {
        var urlRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        let links = ""
        if (desc) links = desc.match(urlRegex)
        if (links?.[0]) {
            setDetectedLink(links[0])
        } else {
            setDetectedLink()
            setlinkDetails()
        }
    }, [desc])


    useEffect(() => {
        const getDetails = async () => {
            if (detectedLink) {
                const details = await axios.post('/story/get-link-details', { link: detectedLink });
                setlinkDetails(details.data)
            }
        }
        getDetails()
    }, [detectedLink])

    if (loadError) return "MapError";
    if (!isLoaded || isLodaing) return (
        <div className="pt-16">
            <SimpleLoader />
        </div>
    )

    return (
        <div className='w-full'>
            <div className="flex mt-6 mb-2">
                <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/news/all">
                    Всі новини
                </NavLink>
                <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 ml-3 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/news/gps">
                    Проекти поблизу
                </NavLink>
            </div>
            <div className="flex lg:flex-row flex-col">
                {/* тут сделать карусель */}
                <Switch>
                    <Route path="/dashboard/news/all">
                        <div className="w-2/12 hidden lg:block order-1 p-0.5">
                            <div className=" border rounded-3xl border-purple-950">
                                {advrts.length > 0 ? (
                                    advrts.map(date => {
                                        return (
                                            <div className="px-1">
                                                <p className="font-semibold text-lg text-purple-950 text-center pt-2">{date.dateString}</p>
                                                {date.events.map(announcement => {
                                                    return (
                                                        <SidebarEventAlert announcement={announcement} />
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="w-full opacity-50">
                                        <div className="">
                                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-64 block m-auto" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="block lg:hidden w-full order-2 p-0.5">
                            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns">
                                {advrtForMob.length > 0 ? (
                                    advrtForMob.map(announcements3 => {
                                        return (
                                            <div className="flex justify-evenly pb-9">
                                                {announcements3.map(advrt => {
                                                    return (
                                                        <div>
                                                            <div className="px-1">
                                                                <p className="font-semibold text-lg text-purple-950 text-center pt-2">{advrt.date}</p>
                                                                <SidebarEventAlert announcement={advrt.announcement} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="w-full opacity-50">
                                        <div className=" pb-4">
                                            <div className="responsive-image-bgImgUrl-cover cursor-pointer relative rounded-t-xl h-36 opacity-100 transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png)` }}></div>
                                        </div>
                                    </div>
                                )}
                            </Carousel>
                        </div>
                    </Route>
                    <Route path="/dashboard/news/gps">
                        <AnnouncementsNearMe announcements={allAdvrts} />
                    </Route>
                    <Route path="/dashboard/news/">
                        <Redirect to="/dashboard/news/all" />
                    </Route>
                </Switch>

                <div className="lg:w-6/12 w-full order-3 lg:order-2 p-1 lg:pl-2">
                    {myProjects.length > 0 ? (
                        <div className="w-full bg-white rounded-3xl custom-shadow p-4 mb-4">
                            <Popup
                                trigger={
                                    <div className="flex items-center">
                                        <div className=" cursor-pointer lg:w-14 lg:h-14 h-12 w-12 hover:opacity-80 transition-all mr-2 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}></div>
                                        <div className=" cursor-pointer w-full bg-gray-200 hover:bg-gray-300 transition-all py-2 px-3 outline-none rounded-full font-medium text-xl">
                                            <p className="text-gray-400">Що нового у вашого проекту</p>
                                        </div>
                                    </div>
                                }
                                modal
                                nested
                            >
                                {close => (
                                    <div className="modal bg-white rounded-xl overflow-y-scroll max-h-screen">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="w-full bg-gray-100 px-4 py-2 text-black text-2xl font-bold rounded-t-xl">
                                            Cтворити новину
                                        </div>

                                        <div className="px-8 z-40">
                                            <div className="w-10/12 mt-3 m-auto">
                                                <div className="px-2 m-auto">
                                                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                                </div>
                                            </div>
                                            <div className="lg:px-8">
                                                {myProjects.length > 1 ? (
                                                    <div className="relative">
                                                        <div onClick={() => toggleMyProjectsList()} className="flex cursor-pointer hover:bg-gray-50 transition-all relative z-30 items-center justify-between custom-shadow bg-white rounded-3xl p-2 mb-5">
                                                            <div className="flex w-9/12 items-center">
                                                                <div className="lg:w-16 lg:h-16 h-14 flex-shrink-0 w-14 custom-shadow relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${selectedProject.logoUrl[0]})` }}></div>
                                                                <p className="font-semibold text-xl pl-3 projectName-text text-purple-950 break-words">{selectedProject.projectName}</p>
                                                            </div>
                                                            <svg className={`transition-all transform rotate-${listIconDegree}`} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                                        </div>
                                                        <div className="absolute z-20 h-auto bg-gray-100 rounded-3xl left-0 top-0 w-full">
                                                            {isListExpanded ? (
                                                                <div className="pt-24 px-4">
                                                                    {myProjects.map(project => {
                                                                        return (
                                                                            <div onClick={() => { setselectedProject(project); setisListExpanded(false); setlistIconDegree("0") }} className="flex items-center hover:bg-gray-200 bg-white cursor-pointer transition-all hover:shadow-xl custom-shadow rounded-3xl p-2 mb-2">
                                                                                <div className="lg:w-16 lg:h-16 h-14 w-3/12 custom-shadow relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}></div>
                                                                                <p className="font-semibold w-9/12 text-xl pl-3 text-purple-950">{project.projectName}</p>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            ) : (null)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center custom-shadow rounded-3xl p-2 mb-5">
                                                        <div className="lg:w-16 lg:h-16 h-14 w-14 custom-shadow relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${selectedProject.logoUrl[0]})` }}></div>
                                                        <p className="font-semibold text-xl pl-3 text-purple-950">{selectedProject.projectName}</p>
                                                    </div>
                                                )}

                                                <div className="w-full mt-1">
                                                    <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Що у вас нового?" className="focus:outline-none focus:border-pink-450 w-full resize-none text-xl px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' >
                                                    </textarea>
                                                </div>

                                                <SearchBar setLocationText={(str) => setLocationString(str)} setLocation={(text) => setLocation(text)} />

                                                {linkDetails && (
                                                    linkDetails.siteName ? (
                                                        <div className="mt-4 lg:w-8/12 xl:w-7/12 lg:m-auto lg:mt-4 rounded-xl bg-gray-200">
                                                            <a href={linkDetails.url} target="_blank" rel="noopener noreferrer">
                                                                <div className="responsive-image-bgImgUrl-cover cursor-pointer relative rounded-t-xl h-80 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${linkDetails.images[0]})` }}></div>
                                                            </a>
                                                            <div className="p-2">
                                                                <p className="text-xl text-gray-600">{linkDetails.siteName && (linkDetails.siteName)}</p>
                                                                <p className="font-medium text-xl ">{linkDetails.title && (linkDetails.title)}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-4 lg:w-8/12 xl:w-7/12 lg:m-auto lg:mt-4 rounded-xl bg-gray-200">
                                                            <div className="p-2">
                                                                <a href={linkDetails.url} target="_blank" rel="noopener noreferrer">
                                                                    <p className="text-xl text-gray-600">{linkDetails.url && (linkDetails.url)}</p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                )}

                                                <div className="relative mt-4">
                                                    <label htmlFor="upload-photo" className="cursor-pointer font-medium text-lg">
                                                        <div className='bg-yellow-350 hover:bg-yellow-400 transition-all rounded-lg inline-flex px-6 py-2'>
                                                            <p className="mr-auto">Завантажити відео чи фото</p>
                                                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/upload.png" alt="upload" className="w-6 self-start inline-block ml-2 mr-auto" />
                                                        </div>
                                                    </label>
                                                    <input className=" opacity-0 absolute -z-10" id="upload-photo" multiple type="file" accept=".png, .jpg, .jpeg, .mov, .mp4, .m4v" onChange={(event) => { multipleFileChangedHandler(event); ProcessFiles(event) }} />
                                                    <p className="text-gray-500">*Максимальна кількість завантаженого відео і фото матеріалів - 4*</p>
                                                </div>
                                                {/* img-preview */}
                                                <div className="img-preview mb-4 flex">
                                                    {renderPhotos(htmlImages)}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="w-full rounded-b-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                            {reqLoading ? (
                                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                            ) : (
                                                null
                                            )}
                                            <button onClick={() => saveStory(close)} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-white text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Опублікувати</button>
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
                    ) : (null)}
                    <Switch>
                        <Route path="/dashboard/news/all">
                            {test}
                        </Route>
                        <Route path="/dashboard/news/gps">
                            <NewsNearMe news={news} />
                        </Route>
                        <Route path="/dashboard/news/">
                            <Redirect to="/dashboard/news/all" />
                        </Route>
                    </Switch>
                </div>
                <div className="lg:w-4/12 w-full order-1 lg:order-3 p-0.5">
                    <div className=" border rounded-3xl border-purple-950">
                        <p className="font-semibold text-lg text-center text-purple-950 p-2">ТОП 10 Проектів ОК</p>
                        <div className="w-full flex flex-wrap">
                            {randomProjects.map(project => {
                                return (<TopPeaceOfNews project={project} />)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
