import React from 'react'

export default function Footer() {
    return (
        <div className="w-full m-auto mt-14 text-white bg-purple-950">
            <div className="w-11/12 pt-7 m-auto flex flex-col lg:flex-row justify-between ">
                <div className=" w-full lg:w-4/12">
                    <a href=""><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/bigLogo_white.png" alt="DvichOK" className=" mb-5 w-6/12 " /></a>
                    <p className="font-medium text-lg">БФ “Омріяна Країна”,</p>
                    <p className="font-medium text-lg">ЄДРПОУ: 40300106, Адрес: 0103, м. Київ, </p>
                    <p className="font-medium text-lg">вул. Предславинська, 39, 4 пов, оф. 428</p>
                </div>
                <div className=" lg:mt-0 mt-3 w-full lg:w-5/12 flex font-medium text-lg">
                    <div className="w-4/12 flex flex-col">
                        <a href="#" className="underline">Головна</a>
                        <a href="#idea" className="underline">Ідея</a>
                        <a href="#plans" className="underline">Плани</a>
                        <a href="#projects" className="underline">Проекти</a>
                    </div>
                    <div className="w-4/12 flex flex-col">
                        <a href="#" className="underline">Проекти</a>
                        <a href="#" className="underline">White Paper</a>
                        <a href="#" className="underline">Блок</a>
                        <a href="#" className="underline">Slack</a>
                    </div>
                    <div className="w-4/12 flex flex-col">
                        <a href="#" className="underline">Ми у ЗМІ</a>
                        <a href="#" className="underline">Власний кабінет</a>
                        <a href="#" className="underline">Долучитися</a>
                        <a href="#" className="underline">Залишити відгук</a>
                    </div>
                </div>
                <div className=" w-full lg:w-3/12 font-medium text-lg mt-3 lg:mt-0">
                    <p className="font-semibold text-xl mb-3">Контакти</p>

                    <p className="font-medium text-lg">Україна, Київ, вул. Предславинська, 39</p>
                    <p className="font-medium text-lg">+38 044 240 05 97 (Україна), </p>
                    <p className="font-medium text-lg">Info@dvizhok.org.ua</p>
                </div>
            </div>
            <div className="w-11/12 pt-7 m-auto">
                <div className="flex flex-row">
                    <div className="m-auto flex flex-row items-center">
                        <div>
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo_white.png" alt="Dvizhok" className=" block m-auto h-5 lg:h-8" />
                        </div>
                        <p className="font-medium text-lg">в соціальних мережах: </p>
                        <a href="#"><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/media/facebook.png" alt="dvizhok in facebook" className=" h-5 lg:h-9 ml-2.5" /></a>
                        <a href="#"><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/media/instagram.png" alt="dvizhok in instagram" className=" h-5 lg:h-9 ml-2.5" /></a>
                        <a href="#"><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/media/vk.png" alt="dvizhok in vk" className=" h-5 lg:h-9 ml-2.5" /></a>
                        <a href="#"><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/media/youtube.png" alt="dvizhok in youtube" className=" h-5 lg:h-9 ml-2.5" /></a>
                    </div>
                </div>
            </div>
            <div className="w-11/12 pt-7 mb-4 m-auto">
                <p className="font-medium text-lg">{`© 2017-${new Date().getFullYear()} Благодійний Фонд «Омріяна Країна» `}</p>
                <p className="font-medium text-lg">{`© 2017-${new Date().getFullYear()} «Революція Світгляду» `}</p>
                <p className="font-medium text-lg">{`© 2017-${new Date().getFullYear()} dvizhok.org.ua Bci права захищені.`}</p>
            </div>
            <div className="w-full font-medium text-lg bg-purple-850">
                <div className="flex lg:flex-row flex-col w-11/12 text-center lg:w-7/12 py-2 text-gray-400 justify-between m-auto">
                    <a href="#" className="underline">Політика конфіденційності</a>
                    <a href="#" className="underline">Відмова від відповідальності</a>
                    <a href="#" className="underline">Згода з розсилкою</a>
                </div>
            </div>
        </div>
    )
}
