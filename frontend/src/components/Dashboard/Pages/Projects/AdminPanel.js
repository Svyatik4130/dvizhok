import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup';
import SuccessNotice from '../../../misc/SuccessNotice';
import ErrorNotice from '../../../misc/ErrorNotice';
import SearchBar from '../Projects/SearchBar';
import "@reach/combobox/styles.css";
import { getSignature } from '../../../helpers/browser-key'
import {
    useLoadScript
} from "@react-google-maps/api";
import axios from 'axios';
import SimpleLoader from '../../../Loaders/SimpleLoader';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import EditProjectInAdminPanel from './EditProjectInAdminPanel';

export default function AdminPanel({ projectInfo, setProjectFnc }) {
    const userData = useSelector(state => state.userData)
    const members = projectInfo.teamMembers.map(member => member)
    members.push(projectInfo.projectleaderId)
    const [isLoading, setIsLoading] = useState(true)
    const [allUsers, setAllUsers] = useState([])

    const [finishTime, setfinishTime] = useState(moment());
    const [finishDate, setfinishDate] = useState()
    const [startTime, setstartTime] = useState(moment());
    const [startDate, setstartDate] = useState()

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [advtName, setadvtName] = useState("")
    const [desc, setDesc] = useState("")
    const [reqLoading, setreqLoading] = useState(false)

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
    const saveAdvt = async (close) => {
        try {
            setError('')
            setreqLoading(true)

            if (advtName.length < 2 || advtName.length > 30) {
                setError(`Довжина назви анонса повинна бути від 2 до 30 символів. Зараз:${advtName.length}`)
                setreqLoading(false)
                return
            }
            if (desc.length < 5 || desc.length > 1000) {
                setError(`Довжина тексту анонса повинна бути від 5 до 1000 символів. Зараз:${desc.length}`)
                setreqLoading(false)
                return
            }
            if (!locationString || !Location) {
                setError(`Введіть локацію анонса`)
                setreqLoading(false)
                return
            }
            if (!startDate || startTime === null) {
                setError(`Введіть дату і час початку анонса`)
                setreqLoading(false)
                return
            }
            if (!finishDate || finishTime === null) {
                setError(`Введіть дату і час закінчення анонса`)
                setreqLoading(false)
                return
            }
            const dateNow = new Date()
            const dateStart = new Date(startDate)
            const dateFinish = new Date(finishDate)
            const timefinish = new Date(finishTime)
            dateFinish.setHours(timefinish.getHours())
            dateFinish.setMinutes(timefinish.getMinutes())

            const timestart = new Date(startTime)
            dateStart.setHours(timestart.getHours())
            dateStart.setMinutes(timestart.getMinutes())

            if (dateStart.getTime() <= dateNow.getTime()) {
                setError("Будь ласка, введіть правильну дату початку анонса");
                setreqLoading(false)
                return
            }
            if (dateFinish.getTime() < dateStart.getTime()) {
                setError("Будь ласка, введіть правильну дату закінчення анонса");
                setreqLoading(false)
                return
            }

            const data = {
                projectId: projectInfo._id,
                projectLogo: projectInfo.logoUrl[0],
                projectName: projectInfo.projectName,
                publisherId: userData.user.id,
                storyType: "announcement",
                text: desc,
                location: Location,
                locationString: locationString,
                announcementName: advtName,
                finishDate: dateFinish,
                startDate: dateStart,
                secret: signature
            }

            let token = localStorage.getItem("auth-token")
            const publishRes = await axios.post('/story/create-announcement', data, {
                headers: {
                    "x-auth-token": token,
                }
            })
            if (publishRes.status === 200) {
                setreqLoading(false)
                setSuccessMessage("Ви успішно опублікували новину")
                setTimeout(() => {
                    close()
                    setSuccessMessage("")
                    setDesc("")
                    setfinishDate()
                    setstartDate()
                    setadvtName()
                    setLocation()
                    setLocationString()
                }, 1500);
            } else {
                setreqLoading(false)
                setError("status !== 200. Error occured")
            }
            console.log(publishRes.data)
        } catch (error) {
            console.log(error)
            setreqLoading(false)
            if (error.response.data) setError(error.response.data.msg)
        }
    }
    const saveStory = async (close) => {
        try {
            setError('')
            setreqLoading(true)

            if (desc.length < 5 || desc.length > 1000) {
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

            data.append('projectId', projectInfo._id)
            data.append('projectLogo', projectInfo.logoUrl[0])
            data.append('projectName', projectInfo.projectName)
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
                setDesc("")
                setTimeout(() => {
                    close()
                    setSuccessMessage("")
                    setDesc("")
                    setfinishDate()
                    setstartDate()
                    setadvtName()
                    setLocation()
                    setLocationString()
                }, 1500);
            } else {
                setreqLoading(false)
                setError("status !== 200. Error occured")
            }

        } catch (error) {
            console.log(error)
            setreqLoading(false)
            if (error.response.data) setError(error.response.data.msg)
        }
    }

    useEffect(() => {
        const preLoadOpps = async () => {
            try {
                const userRed = await axios.get("/users/get-all-users")
                setAllUsers(userRed.data)

                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        preLoadOpps()
    }, [])

    if (loadError) return "MapError";
    if (!isLoaded) return (
        <div className="py-7">
            <SimpleLoader />
        </div>
    )

    if (isLoading) {
        return (
            <div className="py-7">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <>
            {members.includes(userData.user.id) ? (
                <>
                    <p className="text-center text-purple-850 font-medium pt-2 text-xl bg-gray-100 rounded-t-3xl">Адміністрування проекту</p>
                    <div className=" bg-gray-100 flex justify-evenly flex-wrap gap-2 rounded-b-3xl text-purple-950  p-4">
                        <Popup
                            trigger={
                                <button className="px-3 py-2 flex items-center bg-yellow-350 hover:bg-opacity-80 transition-all font-semibold rounded-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>Добавити новину</button>
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
                                            <div className="px-2 pb-1 m-auto">
                                                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                                {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                            </div>
                                        </div>
                                        <div className="lg:px-8">
                                            <div className="flex items-center custom-shadow rounded-3xl p-2">
                                                <div className="lg:w-16 lg:h-16 h-14 w-14 custom-shadow relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${projectInfo.logoUrl[0]})` }}></div>
                                                <p className="font-semibold text-xl pl-3 text-purple-950">{projectInfo.projectName}</p>
                                            </div>

                                            <SearchBar setLocationText={(str) => setLocationString(str)} setLocation={(text) => setLocation(text)} />

                                            <div className="w-full mt-1">
                                                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Що у вас нового?" className="focus:outline-none focus:border-pink-450 w-full resize-none text-xl px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' ></textarea>
                                            </div>

                                            <div className="relative mt-3">
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

                        <Popup
                            trigger={
                                <button className="px-3 py-2 flex items-center bg-yellow-350 hover:bg-opacity-80 transition-all font-semibold rounded-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Додати анонс</button>
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
                                        Cтворити анонс
                                    </div>

                                    <div className="px-8 z-40">
                                        <div className="w-10/12 mt-3 m-auto">
                                            <div className="px-2 m-auto">
                                                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                                {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                            </div>
                                        </div>
                                        <div className="lg:px-8">
                                            <div className="w-full">
                                                <textarea value={advtName} onChange={e => setadvtName(e.target.value)} placeholder="Назва " className="focus:outline-none focus:border-pink-450 w-full resize-none text-xl px-2 py-1 rounded-lg border-2 border-purple-950" rows='1' ></textarea>
                                            </div>

                                            <SearchBar setLocationText={(str) => setLocationString(str)} setLocation={(text) => setLocation(text)} />

                                            <div className="w-full mt-1">
                                                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Опис анонсу" className="focus:outline-none focus:border-pink-450 w-full resize-none text-xl px-2 py-1 rounded-lg border-2 border-purple-950" rows='3' ></textarea>
                                            </div>

                                            <p className="font-semibold text-lg mt-3">Початок:</p>
                                            <div className="flex items-center">
                                                <input type="date" value={startDate} onChange={e => { setstartDate(e.target.value) }} className="flex px-1 mr-3 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                                <div className="flex items-center">
                                                    <p className="font-medium text-lg pr-1">Час:</p>
                                                    <TimePicker value={startTime} onChange={(e) => setstartTime(e)} defaultValue={moment()} showSecond={false} minuteStep={15} />
                                                </div>
                                            </div>

                                            <p className="font-semibold text-lg mt-1">Завершення:</p>
                                            <div className="flex items-center">
                                                <input type="date" value={finishDate} onChange={e => { setfinishDate(e.target.value) }} className="flex px-1 mr-3 py-2 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                                <div className="flex items-center">
                                                    <p className="font-medium text-lg pr-1">Час:</p>
                                                    <TimePicker value={finishTime} onChange={(e) => setfinishTime(e)} defaultValue={moment()} showSecond={false} minuteStep={15} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="w-full rounded-b-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                        {reqLoading ? (
                                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                        ) : (
                                            null
                                        )}
                                        <button onClick={() => saveAdvt(close)} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-white text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Опублікувати</button>
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

                        <EditProjectInAdminPanel project={projectInfo} allUsers={allUsers} setProjectFnc={setProjectFnc} />
                        <button className="px-3 py-2 bg-yellow-350 hover:bg-opacity-80 transition-all font-semibold rounded-3xl">Зв'язатись з послідовниками </button>
                    </div>
                </>
            ) : (null)}
        </>
    )
}
