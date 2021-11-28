import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Team() {
    return (
        <div className="w-full bg-purple-950 mt-14 pt-6">
            <p className="text-4xl md:text-5xl text-center font-semibold text-white mb-5">Команда</p>

            <Carousel showThumbs={false} showStatus={false} className="px-7 hidden lg:block mt-24">
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-144 rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Олексій Толкачов </p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Бельгія-Україна<br /> CEO, засновник, ідеолог проекту</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-144  rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Олександр Лєйкін</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Польща<br /> Chief Software Architect</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-144 rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Святослав Леонов</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Чехія <br /> UI/UX designer/developer</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div className="bg-white h-144  rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Юрій Федоренко</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Україна<br /> PR/GR, chief analytics officer</p>
                        </div>
                    </div>
                </div>
            </Carousel>

            {/* for mobile devices */}
            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="px-7 lg:hidden mt-24">
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-full">
                        <div className="bg-white h-144 rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Олексій Толкачов </p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Бельгія-Україна<br /> CEO, засновник, ідеолог проекту</p>
                        </div>
                    </div>
                </div>
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-full">
                        <div className="bg-white h-144 rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Олександр Лєйкін</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Польща<br /> Chief Software Architect</p>
                        </div>
                    </div>
                </div>
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-full">
                        <div className="bg-white h-144 rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/atolex.png" alt="Alex Tolkachov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Святослав Леонов</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Чехія <br /> UI/UX designer/developer</p>
                        </div>
                    </div>
                </div>
                <div className="px-5 w-11/12 flex flex-row m-auto pb-12">
                    <div className="w-full">
                        <div className="bg-white h-144 rounded-3xl">
                            <div className="bg-cover h-86 filter grayscale">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/svyatoslav.jpeg" alt="Svyatoslav Leonov" className="object-cover h-full rounded-t-3xl" />
                            </div>
                            <p className="font-semibold text-purple-950 text-2xl mt-4">Юрій Федоренко</p>
                            <p className="font-regular text-gray-400 text-lg mt-1">Україна<br /> PR/GR, chief analytics officer</p>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
