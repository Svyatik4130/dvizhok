import React, { useState, useEffect } from 'react'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import descriptions from './sources/descs.json'

export default function ImplementedProjects() {
    const [SelectedProj, setSelectedProj] = useState({
        title: "СТАРОНАВОДНИЦЬКА БАШТА",
        desc: "Ми гуртуємо людей, які не чекають дива, а самі творять дива. Творцям Омріяної Країни ми даємо мережеві можливості для спілкування, обміну досвідом, взаємної пдтримки та cпівпраці.",
        video_src: "images/1screen_short_cropped.mp4"
    })
    const [lastSelected, setlastSelected] = useState()

    useEffect(() => {
        setlastSelected(document.getElementsByClassName('start-object')[0])
    }, [])

    const selectProj = (e) => {
        lastSelected.classList.add("darker-image")
        lastSelected.parentElement.style.top = "0px"

        e.target.classList.remove("darker-image")
        let target = e.target.parentElement
        const title = target.querySelector('.project_title').innerHTML.toLowerCase()
        target.style.top = "-15px"
        setlastSelected(e.target)

        const findArr = descriptions.find(e => e.title.toLowerCase() === title)
        console.log(findArr)
        if (findArr) {
            console.log("good")
            setSelectedProj({
                title: findArr.title,
                desc: findArr.desc,
                video_src: findArr.videosrc
            })
        }
    }

    return (
        <div className="w-10/12 m-auto mt-8">
            <div id="projects" className='w-full mb-16 h-0.5'></div>
            <p className="text-center text-purple-950 font-bold text-4xl md:text-5xl">Реалізовані проекти</p>
            <div className="w-full mt-8 flex flex-col lg:flex-row">
                <div className="w-full order-2 lg:order-1 lg:w-5/12 pt-3 lg:pt-0 lg:pr-5">
                    <div className="bg-white rounded-3xl px-8 py-6">
                        <p className="text-center font-bold text-xl md:text-2xl text-purple-950">{SelectedProj.title}</p>
                        <p className="text-center font-medium md:text-lg mt-4 lg:tracking-wider">{SelectedProj.desc}</p>
                    </div>
                </div>
                <div className=" w-full order-1 lg:order-2 lg:w-7/12">
                    <video src={SelectedProj.video_src} preload="auto" controls={true} className=" w-full rounded-xl"></video>
                </div>
            </div>

            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className=" hidden lg:block prpl-btns mt-24">
                <div className="w-full pt-5 flex px-6 pb-12">
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 transition-all rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project and add this to ./sources/descs.json */}
                            <h1 className="hidden project_title">Майстерня переробки пластику EcoREactive</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Майстерня переробки пластику EcoREactive</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full -top-2 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_2.png" alt="impl_proj_2" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg start-object z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Старонаводницька Башта</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_3.png" alt="impl_proj_3" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">EdCamp діє!</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">EdCamp діє!</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_4.png" alt="impl_proj_4" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Старонаводницька Башта</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-5 flex px-6 pb-12">
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Майстерня переробки пластику EcoREactive</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Майстерня переробки пластику EcoREactive</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_2.png" alt="impl_proj_2" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Старонаводницька Башта</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_3.png" alt="impl_proj_3" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">EdCamp діє!</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">EdCamp діє!</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_4.png" alt="impl_proj_4" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Старонаводницька Башта</h1>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                </div>
            </ Carousel>

            {/* for mobilde devices */}
            <Carousel showThumbs={false} autoPlay={false} showStatus={false} className="lg:hidden prpl-btns mt-12">
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Майстерня переробки пластику EcoREactive</h1>
                        <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Майстерня переробки пластику EcoREactive</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_2.png" alt="impl_proj_2" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Старонаводницька Башта</h1>
                        <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_3.png" alt="impl_proj_3" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">EdCamp діє!</h1>
                        <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">EdCamp діє!</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full top-0 transition-all relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_4.png" alt="impl_proj_4" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Старонаводницька Башта</h1>
                        <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                    </div>
                </div>
            </ Carousel>
            <div id="team" className='w-full mb-16 h-0.5'></div>
        </div>
    )
}
