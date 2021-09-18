import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup';
import SuccessNotice from '../../../misc/SuccessNotice';
import ErrorNotice from '../../../misc/ErrorNotice';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { loggedUser } from '../../../../actions/UserActions'
import { getSignature } from '../../../helpers/browser-key'

export default function Info() {
    const userData = useSelector(state => state.userData)
    const [photoFile, setPhotoFile] = useState("")
    const [avatar, setAvatar] = useState([])
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [reqLoading, setreqLoading] = useState(false)

    const dispatch = useDispatch()
    const signature = getSignature()

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

    function ProcessAvatar(e) {
        setAvatar([])
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map((file) => {
                return URL.createObjectURL(file)
            })
            setAvatar((prevImages) => prevImages.concat(fileArr))
        }
        Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }

    const handleProfImgChange = (close) => {
        if (photoFile === '') {
            setError('Будь ласка, завантажте аватар');
            return
        }

        const location = "images/avatars/"
        multipleFileUploadHandler(location, close)
    }

    const multipleFileUploadHandler = async (location, close) => {
        setError('')
        setreqLoading(true)

        // If file selected
        if (photoFile) {
            let areNamesSuitable = true
            const data = new FormData();
            console.log(photoFile)

            data.append('avatar', photoFile);
            data.append('userId', userData.user.id);
            data.append('secret', signature);

            let token = localStorage.getItem("auth-token")
            const payload = { userId: userData.user.id, signature }
            try {
                const prepublishRes = await axios.post("/users/prepublish-check", payload, { headers: { "x-auth-token": token, "secret": signature } })
                console.log(prepublishRes)
                if (prepublishRes.status === 201) {
                    const ChangeRes = await axios.post('/users/change-avatar', data, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': 'multipart/form-data',
                            'location': `${location}`
                        }
                    })
                    // If file size is larger than expected.
                    if (ChangeRes.data.msg) {
                        if (ChangeRes.data.msg.code === "LIMIT_FILE_SIZE") {
                            setError('Max size: 20MB')
                        } else if (ChangeRes.data.msg.code === 'LIMIT_UNEXPECTED_FILE') {
                            setError('Max 4 images allowed');
                        } else {
                            setError(ChangeRes.data.msg)
                        }
                    } else {
                        // Success with images and videos
                        setSuccessMessage('Проект опублікован')
                        setPhotoFile('')
                        setAvatar([])
                        dispatch(
                            loggedUser(ChangeRes.data)
                        )

                        close()
                    }
                    setreqLoading(false)
                } else {
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
    }

    return (
        <div className="flex w-full lg:flex-row flex-col">
            <p className="text-3xl text-purple-950 mb-2 font-bold lg:hidden block">{userData.user.name}</p>

            <div className="lg:w-8/12 w-full flex">
                <div className="mb-1 lg:w-44 lg:h-44 h-28 w-28 mx-8 relative rounded-full overflow-hidden responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}>
                    <Popup
                        trigger={
                            <label htmlFor="upload-profPic" className="cursor-pointer font-medium text-lg">
                                <div className="absolute bottom-0 w-full lg:py-4 py-5 text-white bg-black-transparent rounded-b-full text-center cursor-pointer">
                                    <p className="font-semibold lg:text-sm text-xs">Змінити фото</p>
                                </div>
                            </label>
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
                                    Вікно зміни аватара
                                </div>

                                <div className="w-10/12 mt-3 m-auto">
                                    <div className="px-2 m-auto">
                                        {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                        {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                    </div>
                                </div>

                                <p className="font-medium text-lg px-5 mt-4 text-gray-600">Будь ласка, завантажте аватар, який буде відображатися у вас в профілі</p>
                                <div className="w-full m-auto flex p-6">


                                    <div className="flex mb-4 items-center">
                                        <div className="logo-preview mr-1.5">
                                            {renderPhotos(avatar)}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="upload-logo" className="cursor-pointer font-medium text-lg">
                                                <div className='bg-yellow-350 hover:bg-yellow-400 transition-all rounded-lg inline-flex px-6 py-2'>
                                                    <p className="mr-auto">Завантажити свій аватар</p>
                                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/upload.png" alt="upload" className="w-6 self-start inline-block ml-2 mr-auto" />
                                                </div>
                                            </label>
                                            <input className=" opacity-0 absolute -z-10" id="upload-logo" type="file" accept=".png, .jpg, .jpeg" onChange={(event) => { setPhotoFile(event.target.files[0]); ProcessAvatar(event) }} />
                                        </div>
                                    </div>


                                </div>
                                <div className="w-full rounded-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                    {reqLoading ? (
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                    ) : (
                                        null
                                    )}
                                    <button onClick={() => handleProfImgChange(close)} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-white text-base font-medium hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Підтвердити</button>
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
                <div className="ml-4">
                    <p className="lg:text-5xl text-3xl text-purple-950 font-bold hidden lg:block">{userData.user.name}</p>
                    <div className="mt-4">
                        {userData.user.role === 0 ? (
                            <div>
                                <div className="flex gap-1 items-center">
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="lg:w-12 w-8" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="lg:w-12 w-8" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="lg:w-12 w-8" />
                                </div>
                                <p className="lg:text-2xl text-xl font-semibold inline-block text-purple-850 lg:mt-4 mt-1">ОКтивіст</p>
                            </div>
                        ) : userData.user.role === 1 ? (
                            <div>
                                <div className="flex gap-1 items-center">
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="lg:w-12 w-8" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="lg:w-12 w-8" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/star.png" alt="star" className="lg:w-12 w-8" />
                                </div>
                                <p className="lg:text-2xl text-xl font-semibold inline-block text-purple-850 lg:mt-4 mt-1">Творець</p>
                            </div>
                        ) : userData.user.role === 2 ? (
                            <div>
                                <div className="flex gap-1 items-center">
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="lg:w-12 w-8" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="lg:w-12 w-8" />
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/filled_star.png" alt="filled_star" className="lg:w-12 w-8" />
                                </div>
                                <p className="lg:text-2xl text-xl font-semibold inline-block text-purple-850 lg:mt-4 mt-1">Лідер</p>
                            </div>
                        ) : (
                            null
                        )
                        }
                    </div>
                </div>
            </div>
            <div className="lg:w-4/12 w-full lg:py-0 py-5">
                <div className="m-auto text-center">
                    <p className="text-purple-950 lg:text-2xl text-lg lg:mb-4 mb-2 font-semibold">Ваш потенціал: {userData.user.balance} грн</p>
                    {/* title has to be responsive */}
                    <a href="#" className="bg-yellow-350 font-semibold text-lg text-purple-950 rounded-full px-6 py-2">Стати Творцем</a>
                </div>
            </div>
        </div>
    )
}
