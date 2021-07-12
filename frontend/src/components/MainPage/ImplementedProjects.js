import React from 'react'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImplementedProjects() {
    return (
        <div className="w-10/12 m-auto mt-8">
            <p className="text-center text-purple-950 font-bold text-5xl">Реалізовані проекти</p>
            <div className="w-full mt-8 flex">
                <div className="w-5/12 pr-5">
                    <div className="bg-white rounded-3xl px-8 py-6">
                        <p className="text-center font-bold text-2xl text-purple-950">СТАРОНАВОДНИЦЬКА БАШТА</p>
                        <p className="text-center font-medium text-lg mt-4 tracking-wider">Ми гуртуємо людей, які не чекають дива, а самі творять дива. Творцям Омріяної Країни ми даємо мережеві можливості для спілкування, обміну досвідом, взаємної пдтримки та cпівпраці.</p>
                    </div>
                </div>
                <div className="w-7/12">
                    <video src="images/1screen_short_cropped.mp4" preload="auto" controls="true" className=" w-full rounded-xl"></video>
                </div>
            </div>

            <Carousel showStatus={false} className="prpl-btns mt-24">
                <div className="w-full flex px-6 pb-12">
                    <div className="w-3/12 cursor-pointer px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex px-6 pb-12">
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                </div>
            </ Carousel>
        </div>
    )
}
