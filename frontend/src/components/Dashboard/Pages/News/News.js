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

export default function News() {
    const userData = useSelector(state => state.userData)
    const myProjects = useSelector(state => state.myProjects)
    const [error, setError] = useState()
    const [isLodaing, setisLodaing] = useState(true)
    const [successMessage, setSuccessMessage] = useState()
    const [reqLoading, setreqLoading] = useState(false)
    const [desc, setDesc] = useState("")

    const [news, setNews] = useState()
    const [advrts, setAdvrts] = useState()

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
    const toggleMyProjectsList = () => {
        setisListExpanded(!isListExpanded)
        if (isListExpanded) {
            setlistIconDegree("0")
        } else {
            setlistIconDegree("180")
        }
    }

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
            if (!selectedFiles) {
                setError('Будь ласка, завантажте хоча б один відео або фото файл');
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
                setSuccessMessage("Ви успішно опублікували новину")
                setTimeout(() => {
                    close()
                }, 1500);
            }
            console.log(publishRes.data)

        } catch (error) {
            console.log(error)
            setreqLoading(false)
            if (error.response.data) setError(error.response.data.msg)
        }
    }

    useEffect(() => {
        const preloadOpps = async () => {
            try {
                const res = await axios.get("/story/get-all-stories")
                setNews(res.data.filter(story => story.storyType === "news"))
                setAdvrts(res.data.filter(announcement => announcement.storyType === "announcement"))

                setisLodaing(false)
            } catch (error) {
                console.log(error)
            }
        }
        preloadOpps()
    }, [])

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
            <div className="flex">
                <div className="w-2/12 p-0.5">
                    <div className=" border rounded-3xl border-purple-950">
                        <p className="font-semibold text-lg text-center text-purple-950 p-2">Сьогодні</p>
                        {advrts ? (
                            advrts.map(announcement => {
                                return (
                                    <SidebarEventAlert announcement={announcement} />
                                )
                            })
                        ) : (null)}
                    </div>
                </div>
                <div className="w-6/12 p-0.5 pl-2">
                    {myProjects.length > 0 ? (
                        <div className="w-full bg-white rounded-3xl custom-shadow p-4 mb-4">
                            <Popup
                                trigger={
                                    <div className="flex items-center">
                                        <div className=" cursor-pointer lg:w-14 lg:h-14 h-12 w-12 hover:opacity-80 transition-all mr-2 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}></div>
                                        <div className=" cursor-pointer w-full bg-gray-200 hover:bg-gray-300 transition-all py-2 px-3 outline-none rounded-full font-medium text-xl">
                                            <p className="text-gray-400">{`Що у вас нового, ${userData.user.name}`}</p>
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
                                            <div className="px-8">
                                                {myProjects.length > 1 ? (
                                                    <div className="relative">
                                                        <div onClick={() => toggleMyProjectsList()} className="flex cursor-pointer hover:bg-gray-50 transition-all relative z-30 items-center justify-between custom-shadow bg-white rounded-3xl p-2 mb-5">
                                                            <div className="flex items-center">
                                                                <div className="lg:w-16 lg:h-16 h-14 w-14 custom-shadow relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${selectedProject.logoUrl[0]})` }}></div>
                                                                <p className="font-semibold text-xl pl-3 text-purple-950">{selectedProject.projectName}</p>
                                                            </div>
                                                            <svg className={`transition-all transform rotate-${listIconDegree}`} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                                                        </div>
                                                        <div className="absolute z-20 h-auto bg-gray-100 rounded-3xl left-0 top-0 w-full">
                                                            {isListExpanded ? (
                                                                <div className="pt-24 px-4">
                                                                    {myProjects.map(project => {
                                                                        return (
                                                                            <div onClick={() => { setselectedProject(project); setisListExpanded(false); setlistIconDegree("0") }} className="flex items-center hover:bg-gray-200 bg-white cursor-pointer transition-all hover:shadow-xl custom-shadow rounded-3xl p-2 mb-2">
                                                                                <div className="lg:w-16 lg:h-16 h-14 w-14 custom-shadow relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}></div>
                                                                                <p className="font-semibold text-xl pl-3 text-purple-950">{project.projectName}</p>
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
                                                    <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Що у вас нового?" className="focus:outline-none focus:border-pink-450 w-full resize-none text-xl px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' ></textarea>
                                                </div>

                                                <SearchBar setLocationText={(str) => setLocationString(str)} setLocation={(text) => setLocation(text)} />

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
                            {news ? (
                                news.map(story => {
                                    return <EventCard story={story} />
                                })
                            ) : (null)}
                        </Route>
                        <Route path="/dashboard/news/gps">
                            <NewsNearMe news={news} />
                        </Route>
                        <Route path="/dashboard/news/">
                            <Redirect to="/dashboard/news/all" />
                        </Route>
                    </Switch>
                </div>
                <div className="w-4/12 p-0.5">
                    <div className=" border rounded-3xl border-purple-950">
                        <p className="font-semibold text-lg text-center text-purple-950 p-2">ТОП 10 Проектів ОК</p>
                        <div className="w-full flex flex-wrap">

                            <div className="w-3/6 p-1">
                                <div className="bg-white rounded-2xl h-52">
                                    <div className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">Література, Фестиваль</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-sm projectName-text truncate-text-3 px-2">Книжковий фестиваль "Book Space" у Дніпрі Книжковий фестиваль Книжковий фестиваль Книжковий фестиваль</p>
                                </div>
                            </div>
                            <div className="w-3/6 p-1">
                                <div className="bg-white rounded-2xl h-52">
                                    <div className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">Література, Фестиваль</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-sm projectName-text truncate-text-3 px-2">Книжковий фестиваль "Book Space" у Дніпрі Книжковий фестиваль Книжковий фестиваль Книжковий фестиваль</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
