import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"

export default function CreateProject() {
    const userData = useSelector(state => state.userData)
    const history = useHistory()

    const [Name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [selectedFiles, setselectedFiles] = useState("")
    const [shortDesc, setshortDesc] = useState("")

    const [isFormReady, setisFormReady] = useState("button")
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [btnColor, setBtnColor] = useState("bg-gray-700 cursor-default")
    const [htmlImages, sethtmlImages] = useState([])
    const [reqLoading, setreqLoading] = useState(false)

    const multipleFileChangedHandler = (event) => {
        setselectedFiles(event.target.files)
    }

    const multipleFileUploadHandler = async (location) => {
        setError('')
        setreqLoading(true)

        // If file selected
        if (selectedFiles) {
            let areNamesSuitable = true
            const data = new FormData();

            for (let i = 0; i < selectedFiles.length; i++) {
                // checking for "/"
                if (selectedFiles[i].name.includes("/")) {
                    areNamesSuitable = false
                }
                data.append('galleryImage', selectedFiles[i]);
            }
            if (areNamesSuitable == false) {
                setError("Назва файлів не повинна містити '/'")
                setreqLoading(false)
                return
            }
            data.append('description', shortDesc)
            data.append('projName', Name)
            data.append('category', category)
            data.append('userId', userData.user.id)
            data.append('userName', userData.user.name)

            let token = localStorage.getItem("auth-token")
            const payload = { shortDesc, Name, category, userId: userData.user.id }
            try {
                const prepublishRes = await axios.post("/project/prepublish-check", payload, { headers: { "x-auth-token": token } })
                console.log(prepublishRes)
                if (prepublishRes.status === 201) {
                    const publishRes = await axios.post('/project/create-project', data, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': 'multipart/form-data',
                            'location': `images/projects/${location}`
                        }
                    })
                    // If file size is larger than expected.
                    console.log(publishRes)
                    if (publishRes.data.msg) {
                        if (publishRes.data.msg.code === "LIMIT_FILE_SIZE") {
                            setError('Max size: 20MB')
                        } else if (publishRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                            setError('Max 4 images allowed');
                        } else {
                            setError(publishRes.data.msg)
                        }
                    } else {
                        // Success with images and videos
                        setSuccessMessage('Проект опублікован')
                        sethtmlImages([])
                        setBtnColor("bg-gray-700 cursor-default")
                        setselectedFiles(null)

                        setBtnColor("bg-gray-700 cursor-default")
                        history.push("/dashboard/projects/myprojects")
                    }
                    setreqLoading(false)
                } else {
                    console.log('hi')
                    setreqLoading(false)
                }
                setreqLoading(false)
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
                console.log(err)
                if (err.response.data.msg) {
                    if (err.response.data.msg.code === "LIMIT_FILE_SIZE") {
                        setError('Max size: 20MB')
                    } else if (err.response.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                        setError('Max 4 images allowed');
                    } else {
                        setError(err.response.data.msg)
                    }
                }
                setreqLoading(false)
            }
        } else {
            // if file not selected throw error
            setError('Please upload file');
            setreqLoading(false)
        }
    };

    // date format yyyy-mm-dd
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (category === "Виберіть категорію проекту") {
            setError('Будь ласка, Виберіть категорію проекту');
            return
        }
        if (Name.length < 5) {
            setError("Назва проекту має містити принаймні 5 символів");
            return
        } else if (Name.includes('/')) {
            setError("Назва проекту не може містити '/");
            return
        }
        if (shortDesc.length < 25) {
            setError("Короткий опис має містити принаймні 25 символів");
            return
        }

        const dateNow = formatDate(new Date)
        const location = `${dateNow}/`
        multipleFileUploadHandler(location)
    }

    // responsive btn color
    useEffect(() => {
        if (category !== "" && category !== "Виберіть категорію проекту" && Name !== "" && selectedFiles !== "" && shortDesc !== "") {
            setBtnColor("bg-purple-950 cursor-pointer")
            setisFormReady("submit")
        } else {
            setBtnColor("bg-gray-700 cursor-default")
            setisFormReady("button")
        }
    }, [category, selectedFiles, Name, shortDesc])


    const renderPhotos = (source) => {
        return source.map((photo) => {
            if (photo.includes("video")) {
                const video = photo.slice(0, -5)
                return (
                    <video controls>
                        <source src={video} key={photo}></source>
                        Your browser does not support HTML5 video.
                    </video>
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
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-5/12 mb-6 p-2">
                    <p className="font-bold text-3xl">Створити новий проект</p>
                </div>
                <div className="w-5/12 pl-9">
                    <div className="w-10/12 mt-3 m-auto">
                        <div className="px-2 m-auto">
                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                            {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                        </div>
                    </div>
                    <input value={Name} placeholder="Назва проекту" onChange={e => setName(e.target.value)} type="text" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                    <div className="relative">
                        <label htmlFor="upload-photo" className="cursor-pointer font-medium text-lg">
                            <div className='bg-yellow-350 rounded-lg inline-flex px-6 py-2'>
                                <p className="mr-auto">Завантажити відео чи фото</p>
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/upload.png" alt="upload" className="w-6 self-start inline-block ml-2 mr-auto" />
                            </div>
                        </label>
                        <input className=" opacity-0 absolute -z-10" id="upload-photo" type="file" accept=".png, .jpg, .jpeg, .mov, .mp4, .m4v" multiple onChange={(event) => { multipleFileChangedHandler(event); ProcessFiles(event) }} />
                        <p className="text-gray-500">*Максимальна кількість завантаженого відео і фото матеріалів - 4*</p>
                    </div>

                    {/* img-preview */}
                    <div className="img-preview mb-4 flex">
                        {renderPhotos(htmlImages)}
                    </div>

                    <div class="relative inline-flex">
                        <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                        <select value={category} onChange={e => setCategory(e.currentTarget.value)} class="border-2 border-purple-950 rounded-xl text-gray-600 h-10 pl-5 pr-10 bg-white focus:outline-none appearance-none">
                            <option>Виберіть категорію проекту</option>
                            <option>Культура</option>
                            <option>Екологія</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <textarea value={shortDesc} onChange={e => setshortDesc(e.target.value)} placeholder="Короткий опис проекту" className="focus:outline-none focus:border-pink-450 w-full resize-none text-lg px-2 py-1 rounded-lg border-2 border-purple-950 mt-4" rows='5' ></textarea>
                    </div>
                </div>
                <div className="flex mt-6 pl-9">
                    <button id="submitbtn" className={`font-meduim text-lg px-6 py-2 ${btnColor} text-white rounded-xl`} type={isFormReady}>+ Створити проект</button>
                    {reqLoading ? (
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-11" />
                    ) : (
                        null
                    )}
                </div>
            </form>
        </div>
    )
}
