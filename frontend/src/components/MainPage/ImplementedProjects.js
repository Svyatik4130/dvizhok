import React, { useState, useEffect } from 'react'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import descriptions from './sources/descs.json'

export default function ImplementedProjects() {
    const [SelectedProj, setSelectedProj] = useState({
        title: "Акція зі збору сміття «Зробимо Україну Чистою!»",
        desc: "У 2013 році було підтримано та організовано всеукраїнську акцію зі збору сміття, яка відбулася 20 квітня 2013 р. Понад 130 000 учасників із понад 200 населених пунктів по всій Україні взяли участь в масштабному прибиранні. У 2014 році участь в акції взяли понад 170 тисяч українців з більше ніж 1000 населених пунктів. Було зібрано 80 т ПЕТ, 348 т скла і 982 т іншого сміття.",
        photosrc: [
            "images/landing/impl_projcts/1.jpg",
            "images/landing/impl_projcts/1-1.png",
            "images/landing/impl_projcts/1-2.jpg",
            "images/landing/impl_projcts/1-3.jpg",
            "images/landing/impl_projcts/1-4.jpg",
            "images/landing/impl_projcts/1-5.jpg"
        ]
    })
    const [lastSelected, setlastSelected] = useState()
    const [slideNumber, setSlideNumber] = useState(0)
    const updateCurrentSlide = (index) => {
        if (slideNumber !== index) {
            setSlideNumber(index);
        }
    };

    useEffect(() => {
        setlastSelected(document.getElementsByClassName('start-object')[0])
    }, [])

    const selectProj = (e) => {
        setSlideNumber(0)
        lastSelected.classList.add("darker-image")
        lastSelected.parentElement.style.top = "0px"

        e.target.classList.remove("darker-image")
        let target = e.target.parentElement
        const title = target.querySelector('.project_title').innerHTML.toLowerCase()
        target.style.top = "-15px"
        setlastSelected(e.target)

        const findArr = descriptions.find(e => e.title.toLowerCase() === title)
        if (findArr) {
            setSelectedProj({
                title: findArr.title,
                desc: findArr.desc,
                photosrc: findArr.photosrc
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
                    <Carousel selectedItem={slideNumber} onChange={(i) => updateCurrentSlide(i)} autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns">
                        {SelectedProj.photosrc.map(src => {
                            return (
                                <div key={src} className="responsive-image-bgImgUrl-cover mb-12 mx-8 rounded-3xl relative h-124 transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/${src})` }}></div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>

            <Carousel autoPlay={false} showThumbs={false} showStatus={false} className=" hidden lg:block prpl-btns mt-24">
                <div className="w-full pt-5 flex px-6 pb-12">
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 -top-2 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/1-1.png)` }}></div>
                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/1-1.png" alt="impl_proj_1" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg start-object z-30"></div>
                            {/* Enter real title of this project and add this to ./sources/descs.json */}
                            <h1 className="hidden project_title">Акція зі збору сміття «Зробимо Україну Чистою!»</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Акція зі збору сміття «Зробимо Україну Чистою!»</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/2.jpg)` }}></div>
                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/2.jpg" alt="impl_proj_2" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Конкурс дитячих малюнків «Омріяна Україна очима дітей»</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Конкурс дитячих малюнків «Омріяна Україна очима дітей»</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/3.jpg)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/3.jpg" alt="impl_proj_3" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Порятунок Шарівського палацу (Харківська обл., с.Шарівка)</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Порятунок Шарівського палацу (Харківська обл., с.Шарівка)</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/4.jpg)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/4.jpg" alt="impl_proj_4" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Порятунок Наводницької вежі Київської фортеці</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Порятунок Наводницької вежі Київської фортеці</p>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-5 flex px-6 pb-12">
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/5.jpg)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/5.jpg" alt="impl_proj_5" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Міжнародний еко-культурний фестиваль «Трипільске коло»</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Міжнародний еко-культурний фестиваль «Трипільске коло»</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/6.jpeg)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/6.jpeg" alt="impl_proj_6" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Музикальне фентезі-шоу «Володарі Стихій»</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Музикальне фентезі-шоу «Володарі Стихій»</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/7.JPG)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/7.JPG" alt="impl_proj_7" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Всеукраїнський тур «Революція світогляду»</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Всеукраїнський тур «Революція світогляду»</p>
                        </div>
                    </div>
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/8.jpg)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/8.jpg" alt="impl_proj_8" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Короткометражна стрічка «Міна» (Once Upon a Mine)</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Короткометражна стрічка «Міна» (Once Upon a Mine)</p>
                        </div>
                    </div>
                </div>
                <div className="w-full pt-5 flex px-6 pb-12">
                    <div className="w-3/12 px-4">
                        <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                            <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/9.png)` }}></div>

                            {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/9.png" alt="impl_proj_9" className="rounded-lg w-full" /> */}
                            <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                            {/* Enter real title of this project */}
                            <h1 className="hidden project_title">Підтримка адаптації та працевлаштування соціально вразливих верств населення</h1>
                            <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Підтримка адаптації та працевлаштування соціально вразливих верств населення</p>
                        </div>
                    </div>
                </div>
            </ Carousel>

            {/* for mobilde devices */}
            <Carousel showThumbs={false} autoPlay={false} showStatus={false} className="lg:hidden prpl-btns mt-12">
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 -top-2 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/1-1.png)` }}></div>
                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/1-1.png" alt="impl_proj_1" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg start-object z-30"></div>
                        {/* Enter real title of this project and add this to ./sources/descs.json */}
                        <h1 className="hidden project_title">Акція зі збору сміття «Зробимо Україну Чистою!»</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Акція зі збору сміття «Зробимо Україну Чистою!»</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/2.jpg)` }}></div>
                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/2.jpg" alt="impl_proj_2" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Конкурс дитячих малюнків «Омріяна Україна очима дітей»</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Конкурс дитячих малюнків «Омріяна Україна очима дітей»</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/3.jpg)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/3.jpg" alt="impl_proj_3" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Порятунок Шарівського палацу (Харківська обл., с.Шарівка)</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Порятунок Шарівського палацу (Харківська обл., с.Шарівка)</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/4.jpg)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/4.jpg" alt="impl_proj_4" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Порятунок Наводницької вежі Київської фортеці</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Порятунок Наводницької вежі Київської фортеці</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/5.jpg)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/5.jpg" alt="impl_proj_5" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Міжнародний еко-культурний фестиваль «Трипільске коло»</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Міжнародний еко-культурний фестиваль «Трипільске коло»</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/6.jpeg)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/6.jpeg" alt="impl_proj_6" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Музикальне фентезі-шоу «Володарі Стихій»</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Музикальне фентезі-шоу «Володарі Стихій»</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/7.JPG)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/7.JPG" alt="impl_proj_7" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Всеукраїнський тур «Революція світогляду»</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Всеукраїнський тур «Революція світогляду»</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/8.jpg)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/8.jpg" alt="impl_proj_8" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Короткометражна стрічка «Міна» (Once Upon a Mine)</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Короткометражна стрічка «Міна» (Once Upon a Mine)</p>
                    </div>
                </div>
                <div className="w-11/12 m-auto pt-5 cursor-pointer px-4 pb-9">
                    <div onClick={selectProj} className="cursor-pointer w-full h-56 top-0 transition-all relative bg-cover">
                        <div className="responsive-image-bgImgUrl-cover rounded-lg w-full h-full transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/9.png)` }}></div>

                        {/* <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/impl_projcts/9.png" alt="impl_proj_9" className="rounded-lg w-full" /> */}
                        <div className="w-full h-full absolute top-0 rounded-lg darker-image z-30"></div>
                        {/* Enter real title of this project */}
                        <h1 className="hidden project_title">Підтримка адаптації та працевлаштування соціально вразливих верств населення</h1>
                        <p className="absolute font-bold bg-black bg-opacity-30 text-lg bottom-3 text-white left-0 right-0 z-40 ml-auto mr-auto text-center">Підтримка адаптації та працевлаштування соціально вразливих верств населення</p>
                    </div>
                </div>
            </ Carousel>
            <div id="team" className='w-full mb-16 h-0.5'></div>
        </div>
    )
}
