import React from 'react'

export default function Map() {
    return (
        <div className="w-10/12 m-auto pt-14">
            <div className="flex items-center justify-center"><p className="text-center text-purple-950 font-bold text-5xl">Творців</p><img src="images/mini_logo.png" alt="ok_logo_mini" className=" h-14" /></div>

            <div className="w-full flex flex-row">
                <div className="w-4/12 pr-4">
                    <div className="bg-white flex flex-col w-full text-center rounded-3xl py-5">
                        <img src="images/mini_logo.png" alt="ok_logo_mini" className=" m-auto h-14 " />
                        <button className="px-12 py-2 text-xl rounded-2xl text-white bg-purple-950 my-6 m-auto">Кабінет</button>
                        <a href="#" className="underline text-2xl font-bold text-purple-950">Переглянути проекти</a>
                    </div>
                </div>
                <div className="w-8/12">
                    {/* map here! */}
                    <img src="images/landing/Map1.png" alt="Ukraine map" className="w-full " />
                </div>
            </div>
        </div>
    )
}
