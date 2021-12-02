import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { getSignature } from '../../../helpers/browser-key'
import ErrorNotice from '../../../misc/ErrorNotice';
import SuccessNotice from '../../../misc/SuccessNotice';
import { loggedUser } from '../../../../actions/UserActions'
import { ReactPhotoCollage } from "react-photo-collage";
import { createPopper } from '@popperjs/core';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    OKShareButton,
    TelegramShareButton,
    TwitterShareButton,
    VKShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    OKIcon,
    TelegramIcon,
    TwitterIcon,
    VKIcon,
} from "react-share";
import ComntSection from './ComntSection';

export default function EventCard({ story }) {
    const userData = useSelector(state => state.userData)
    const history = useHistory()
    const [successMessage, setSuccessMessage] = useState()
    const [error, setError] = useState()
    const signature = getSignature()
    const dispatch = useDispatch()
    const createdAt = new Date(story.createdAt)

    const [likedIds, setlikedIds] = useState(story.likedIds)
    const [reqLoading, setreqLoading] = useState(false)
    const [amount, setAmount] = useState(0)

    const setting = {
        width: '600',
        height: ['250px', '170px'],
        layout: story.photosNvideos.length === 1 ? ([1]) : (story.photosNvideos.length === 2 ? ([2]) : (story.photosNvideos.length === 3 ? ([1, 2]) : (story.photosNvideos.length === 4 ? ([1, 3]) : (story.photosNvideos.length === 5 ? ([2, 3]) : (story.photosNvideos.length > 5 ? ([2, 4]) : ([2, 5])))))),
        photos:
            story.photosNvideos.map(link => {
                return { source: link }
            })
        ,
        showNumOfRemainingPhotos: true
    };
    console.log(story.photosNvideos.map(link => {
        return { source: link }
    }), [
        // story.photosNvideos.map(link => {
        //     return { source: link }
        // })
        { source: "https://dvizhok-hosted-content.s3.amazonaws.com/images/projects/storybigLogo-1634843466242.png" },
        { source: "https://dvizhok-hosted-content.s3.amazonaws.com/images/projects/storymini_logo-1634843466245.png" },
        { source: "https://dvizhok-hosted-content.s3.amazonaws.com/images/projects/storybigLogo-1634843466242.png" },
        { source: "https://dvizhok-hosted-content.s3.amazonaws.com/images/projects/storymini_logo-1634843466245.png" },
        { source: "https://dvizhok-hosted-content.s3.amazonaws.com/images/projects/storybigLogo-1634843466242.png" },
        { source: "https://dvizhok-hosted-content.s3.amazonaws.com/images/projects/storymini_logo-1634843466245.png" },
    ])

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
            const res = await axios.post("/project/raise", { amount: Number(amount), userId: userData.user.id, projectId: story.projectId, signature }, {
                headers: { "x-auth-token": token },
            })
            if (res.status === 200) {
                setSuccessMessage("Ви успішно підтримали проект!")
                dispatch(loggedUser({
                    token: res.data.token,
                    user: res.data.user
                }))
                setTimeout(() => {
                    closeFnc()
                }, 1500);
            }
            setreqLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const likeEvent = async () => {
        try {
            const payload = { idsWhoLiked: likedIds, userId: userData.user.id, eventId: story._id }
            const res = await axios.post("/story/like-event", payload)
            setlikedIds(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTooltip = (index) => {
        const actBtn = document.getElementsByClassName(`btn-${index}`)[0]
        const tooltip = document.getElementsByClassName(`tooltip-${index}`)[0]
        if (tooltip.classList.contains("tooltip-data-show")) {
            tooltip.classList.remove("tooltip-data-show")
        } else {
            createPopper(actBtn, tooltip, {
                placement: 'top',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                        preventOverflow: { enabled: false },
                    },
                ],
            });
            tooltip.classList.add("tooltip-data-show")
        }
    }

    return (
        <div className="bg-white transition-all rounded-3xl p-3 mb-2">
            <div className="flex items-center mb-2">
                <div className="lg:w-16 lg:h-16 h-14 w-14 relative rounded-full overflow-hidden flex-shrink-0 responsive-image-bgImgUrl-cover" style={{ backgroundImage: `url(${story.projectLogo})` }}></div>
                <div>
                    <p className="font-medium text-xl pl-3"><strong onClick={() => history.push(`/dashboard/projects/${story.projectId}`)} className="text-purple-950 hover:text-purple-850 transition-all cursor-pointer">{story.projectName}</strong> додав(-ла) {story.photosNvideos.length} фото</p>
                    <p className="text-lg pl-3">{`${createdAt.toLocaleString()}`}</p>
                </div>
            </div>
            <p className="font-medium text-lg">{story.text}</p>
            {/* <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns pl-3">
                {story.photosNvideos.map(file => {
                    return (<div className="mb-9 mx-8 h-56 responsive-image-bgImgUrl" style={{ backgroundImage: `url(${file})` }}></div>)
                })}
            </Carousel> */}
            <div className="py-4">
                <ReactPhotoCollage {...setting} />
            </div>
            <div className="flex relative items-center">
                <svg onClick={() => likeEvent()} className={`hover:text-purple-850 hover:text-opacity-80 transition-all fill-current cursor-pointer ${likedIds.includes(userData.user.id) ? ("text-purple-950") : ("text-white")} transition-all cursor-pointer" xmlns="http://www.w3.org/2000/svg`} width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                {likedIds.length === 0 ? (null) : (<p className="font-medium pl-1 text-lg">{likedIds.length}</p>)}
                <svg onClick={() => createTooltip(story._id)} className={`ml-4 btn-${story._id} cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                <div className={`tooltip-${story._id} z-40 w-32 lg:w-80 transition-all tooltip bg-gray-50 border custom-shadow rounded-2xl border-purple-950 p-4`}>
                    <div onClick={() => createTooltip(story._id)} className="absolute -top-2.5 -right-2 bg-white rounded-full hover:bg-opacity-90 transition-all"><svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                    <div className="max-h-96 flex gap-1 overflow-y-scroll">
                        <FacebookShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <EmailShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                        <LinkedinShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                        <OKShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <OKIcon size={32} round />
                        </OKShareButton>
                        <TelegramShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <TwitterShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <VKShareButton
                            url={`http://31.131.24.170:3000/dashboard/projects/${story.projectId}`}
                        >
                            <VKIcon size={32} round />
                        </VKShareButton>
                    </div>
                </div>

                <Popup
                    trigger={
                        <button className="bg-yellow-350 ml-4 text-center py-2 px-4 rounded-2xl inline-flex text-lg font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-7 ml-2" alt="support" /> </button>
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
            
            <ComntSection advtInfo={story} />
        </div>
    )
}
