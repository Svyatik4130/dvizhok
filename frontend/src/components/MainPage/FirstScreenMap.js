import React from 'react'
import { useHistory } from "react-router-dom"

export default function FirstScreenMap() {
    const history = useHistory()

    return (
        <div style={{ paddingTop: "64px" }} className="w-full h-auto">
            <div className="w-full bg-purple-950">
                <div className="absolute z-40 w-full px-5 xl:p-0 xl:w-10/12 flex flex-col justify-between text-white h-5/6 left-0 right-0 ml-auto mr-auto">
                    <div className="h-3/6 flex flex-col justify-between relative mt-24">
                    <p className="2xl:text-8xl md:text-6xl text-3xl text-red-700 font-bold absolute opacity-80 bg-yellow-200 animate-pulse text-center top-2/4 w-full">ТЕСТОВИЙ РЕЖИМ</p>
                        <p className="2xl:text-5xl xl:text-4xl md:text-3xl text-xl font-semibold">Малими зусиллями творимо великі зміни!</p>
                        <div className="text-center">
                            <p className="2xl:text-5xl xl:text-4xl md:text-3xl text-xl inline-block text-left font-semibold">Підтримайте важливі проекти регулярним внеском</p>
                        </div>
                        <div className="text-right">
                            <p className="2xl:text-5xl xl:text-4xl md:text-3xl text-xl inline-block text-left font-semibold">Заявіть про себе - реалізуйте свій проект! </p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-evenly">
                        <button onClick={() => history.push("/signup")} className=" px-4 lg:px-12 py-4 lg:py-2 my-4 text-xl lg:text-3xl rounded-2xl font-semibold bg-white text-purple-950"> Долучитись </button>
                        <button onClick={() => history.push("/signup")} className=" px-4 lg:px-12 py-4 lg:py-2 my-4 text-xl lg:text-3xl rounded-2xl font-semibold bg-white text-purple-950"> Додати проект  </button>
                    </div>
                </div>
                <div className="bg-cover">
                    <video id="video" onContextMenu={(e) => e.preventDefault()} src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/1screen_short_cropped.mp4" preload="auto" playsInline={true} autoPlay={true} loop={true} muted="muted" className="-z-10 w-full h-screen object-cover hidden md:block"></video>
                    {/* gif for mob devices */}
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/bgvideo.gif" alt="dvizhok" className="-z-10 w-full h-screen object-cover md:hidden" />
                </div>
                <div id="idea" className='w-full mb-16 h-0.5'></div>
            </div>
        </div>
    )
}
