import React from 'react'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Map() {
    const history = useHistory()
    const userData = useSelector(state => state.userData)

    return (
        <div className="md:w-10/12 w-11/12 m-auto pt-14">
            <div className="flex items-center justify-center"><p className="text-center text-purple-950 font-bold text-4xl md:text-5xl">Географія</p><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png" alt="ok_logo_mini" className=" h-10 md:h-14" /></div>

            <div className="w-full flex flex-col mt-8 lg:mt-0 lg:flex-row">
                <div className="lg:w-4/12 w-full lg:pr-4">
                    <div className="bg-white flex flex-col w-full text-center rounded-3xl py-5">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png" alt="ok_logo_mini" className=" m-auto h-14 " />
                        <button onClick={() => history.push(userData.user ? ("/dashboard/profile/personal_info") : ("/signup"))} className="px-12 py-2 text-xl rounded-2xl text-white bg-purple-950 my-6 m-auto">Кабінет</button>
                        <a onClick={() => history.push("/guest/projects/")} className="underline text-2xl font-bold text-purple-950">Переглянути проекти</a>
                    </div>
                </div>
                <div className="lg:w-8/12 w-full">
                    {/* map here! */}
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/Map1.png" alt="Ukraine map" className="w-full " />
                </div>
            </div>
        </div>
    )
}
