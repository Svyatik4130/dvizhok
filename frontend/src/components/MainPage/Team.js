import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Team() {
    return (
        <div className="w-full bg-purple-950 mt-14 pt-6">
            <p className="text-5xl text-center font-semibold text-white mb-5">Команда</p>
            <Carousel showStatus={false} className="px-7 hidden lg:block mt-24">
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124 rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Alex Tolkachov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Founder, CEO</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124  rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Svyatoslav Leonov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Web designer, Fullstack developer</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124 rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Alex Tolkachov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Founder, CEO</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124  rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Svyatoslav Leonov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Web designer, Fullstack developer</p>
                        </div>
                    </div>
                </div>
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124 rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Alex Tolkachov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Founder, CEO</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124  rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Svyatoslav Leonov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Web designer, Fullstack developer</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124 rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Alex Tolkachov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Founder, CEO</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-124  rounded-3xl">
                            <div className="bg-cover h-86">
                                <img src="images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Svyatoslav Leonov</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Web designer, Fullstack developer</p>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
