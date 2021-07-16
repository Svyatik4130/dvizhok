import React from 'react'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImplementedProjects() {
    return (
        <div className="w-10/12 m-auto mt-8">
            <div id="projects" className='w-full mb-16 h-0.5'></div>
            <p className="text-center text-purple-950 font-bold text-4xl md:text-5xl">Реалізовані проекти</p>
            <div className="w-full mt-8 flex flex-col lg:flex-row">
                <div className="w-full order-2 lg:order-1 lg:w-5/12 pt-3 lg:pt-0 lg:pr-5">
                    <div className="bg-white rounded-3xl px-8 py-6">
                        <p className="text-center font-bold text-xl md:text-2xl text-purple-950">СТАРОНАВОДНИЦЬКА БАШТА</p>
                        <p className="text-center font-medium md:text-lg mt-4 lg:tracking-wider">Ми гуртуємо людей, які не чекають дива, а самі творять дива. Творцям Омріяної Країни ми даємо мережеві можливості для спілкування, обміну досвідом, взаємної пдтримки та cпівпраці.</p>
                    </div>
                </div>
                <div className=" w-full order-1 lg:order-2 lg:w-7/12">
                    <video src="images/1screen_short_cropped.mp4" preload="auto" controls={true} className=" w-full rounded-xl"></video>
                </div>
            </div>

            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className=" hidden lg:block prpl-btns mt-24">
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
                            <img src="images/landing/implemented_projects/impl_proj_2.png" alt="impl_proj_2" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_3.png" alt="impl_proj_3" className="rounded-lg w-full" />
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            <p className="absolute font-bold text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="w-full relative bg-cover">
                            <img src="images/landing/implemented_projects/impl_proj_4.png" alt="impl_proj_4" className="rounded-lg w-full" />
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

            {/* for mobilde devices */}
            <Carousel showThumbs={false} autoPlay={false} showStatus={false} className="lg:hidden prpl-btns mt-12">
                <div className="w-11/12 m-auto cursor-pointer px-4 pb-9">
                    <div className="w-full relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_1.png" alt="impl_proj_1" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        <p className="absolute font-bold text-lg bottom-9 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto cursor-pointer px-4 pb-9">
                    <div className="w-full relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_2.png" alt="impl_proj_2" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        <p className="absolute font-bold text-lg bottom-9 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto cursor-pointer px-4 pb-9">
                    <div className="w-full relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_3.png" alt="impl_proj_3" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        <p className="absolute font-bold text-lg bottom-9 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto cursor-pointer px-4 pb-9">
                    <div className="w-full relative bg-cover">
                        <img src="images/landing/implemented_projects/impl_proj_4.png" alt="impl_proj_4" className="rounded-lg w-full" />
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        <p className="absolute font-bold text-lg bottom-9 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Старонаводницька Башта</p>
                    </div>
                </div>
            </ Carousel>
            <div id="team" className='w-full mb-16 h-0.5'></div>
        </div>
    )
}
