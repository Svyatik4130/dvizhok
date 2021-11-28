import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function RoadMap() {
    return (
        <div className="w-full bg-purple-950 mt-14">
            <div className="m-auto text-white w-full pt-7">
                <p className="text-center text-3xl md:text-5xl tracking-wide font-bold">Дорожня карта</p>
                <p className="text-center text-xl md:text-2xl tracking-wide mt-2 font-medium">Етапи створення і розвитку мережі DvizhOK</p>
            </div>
            <div className="w-full">
                <Carousel showThumbs={false} showStatus={false} className="px-7 hidden xl:block mt-24">
                    <div className='relative'>
                        <div className="w-10/12 m-auto flex pb-20">
                            <div style={{ top: "86px" }} className=" roadmap-road_background z-20 absolute w-full h-3 bg-purple-400"></div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Травень 2012 рік </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Виникнення ідеї “DvizhOK”</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Липень 2015 року </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування завершеної концепції</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Листопад 2016 року </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Початок розробки Мережі “DvizhOK”</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                        <div className="w-10/12 m-auto flex pb-20">
                            <div style={{ top: "86px" }} className=" roadmap-road_background z-20 absolute w-full h-3 bg-purple-400"></div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Липень 2020 року </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Розробка оновленої MVP Мережі “DvizhOK”</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Вересень 2021 року </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Реєстрація авторських прав в Україні, ЄС та США</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Квітень 2022 року </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Повнофункціональний запуск Мережі в Україні</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                        <div className="w-10/12 m-auto flex pb-20">
                            <div style={{ top: "86px" }} className=" roadmap-road_background z-20 absolute w-full h-3 bg-purple-400"></div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Травень 2022 року  </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Початок масштабної промо кампанії в Україні </p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Листопад 2022 року  </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Перший мільйон користувачів мережі в Україні</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Січень 2023 року  </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Розбробка версії 2.0 на основі технологій блокчейн</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                        <div className="w-10/12 m-auto flex pb-20">
                            <div style={{ top: "86px" }} className=" roadmap-road_background z-20 absolute w-full h-3 bg-purple-400"></div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Квітень 2023 року</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Масштабуванння та запуск мережі в США та Росії </p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Вересень 2024 року   </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Запуск мережі с Бразилії, Індонезії, Індії, Китаї</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>

                {/* for mobile devices */}
                <Carousel showThumbs={false} showStatus={false} className="px-7 xl:hidden mt-24">
                    <div className="w-11/12 m-auto pb-12 relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Травень 2012 рік </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Виникнення ідеї “DvizhOK”</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Липень 2015 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування завершеної концепції</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Листопад 2016 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Початок розробки Мережі “DvizhOK”</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto pb-12 relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Липень 2020 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Розробка оновленої MVP Мережі “DvizhOK”</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Вересень 2021 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Реєстрація авторських прав в Україні, ЄС та США</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Квітень 2022 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Повнофункціональний запуск Мережі в Україні</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Травень 2022 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Початок масштабної промо кампанії в Україні </p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Листопад 2022 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Перший мільйон користувачів мережі в Україні</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Січень 2023 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Розбробка версії 2.0 на основі технологій блокчейн</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Квітень 2023 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Масштабуванння та запуск мережі в США та Росії</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Вересень 2024 року </p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Запуск мережі с Бразилії, Індонезії, Індії, Китаї</p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
