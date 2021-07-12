import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function RoadMap() {
    return (
        <div className="w-full bg-purple-950 mt-14">
            <div className="m-auto text-white w-full pt-7">
                <p className="text-center text-3xl md:text-5xl tracking-wide font-bold">Дорожня карта</p>
                <p className="text-center text-xl md:text-2xl tracking-wide mt-2 font-medium">Этапы создания и развития платформы DvizhOk</p>
            </div>
            <div className="w-full">
                <Carousel showStatus={false} className="px-7 hidden lg:block mt-24">
                    <div className='relative'>
                        <div className="w-10/12 m-auto flex pb-20">
                            <div style={{ top: "86px" }} className=" roadmap-road_background z-20 absolute w-full h-3 bg-purple-400"></div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Q2 2017</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Q4 2017</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Q2 2018</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
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
                                        <p className="text-center text-purple-950 text-2xl font-medium">Q2 2017</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Q4 2017</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                                </div>
                            </div>
                            <div className="w-4/12 z-40 pr-5">
                                <div className="m-auto">
                                    <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                        <p className="text-center text-purple-950 text-2xl font-medium">Q2 2018</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full m-auto mt-6 bg-white"></div>
                                    <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>

                {/* for mobile devices */}
                <Carousel showStatus={false} className="px-7 lg:hidden mt-24">
                    <div className="w-11/12 m-auto pb-12 relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Q2 2017</p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Q4 2017</p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Q2 2018</p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto pb-12 relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Q2 2017</p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Q4 2017</p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                        </div>
                    </div>
                    <div className="w-11/12 m-auto relative z-10">
                        <div style={{ top: "86px" }} className=" roadmap-road_background -z-10 absolute w-full h-3"></div>
                        <div className="m-auto z-30">
                            <div className='inline-block w-auto m-auto bg-white px-4 py-2 rounded-3xl'>
                                <p className="text-center text-purple-950 text-2xl font-medium">Q2 2018</p>
                            </div>
                            <div className="w-10 h-10 rounded-full m-auto mt-6 z-40 bg-white"></div>
                            <p className="text-center text-white font-medium text-2xl mt-6">Формування команди розробників і маркетологів Створення чернойо версії White Paper</p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
