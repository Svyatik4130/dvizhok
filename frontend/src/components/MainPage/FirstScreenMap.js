import React from 'react'
import ReactPlayer from 'react-player'

export default function FirstScreenMap() {
    return (
        <div style={{ paddingTop: "64px" }} className="w-full h-auto">
            <div className="w-full bg-purple-950">
                <div className="absolute z-40 w-full px-5 lg:p-0 lg:w-10/12 flex flex-col justify-between text-white h-5/6 left-0 right-0 ml-auto mr-auto">
                    <div className="h-3/6 flex flex-col justify-between mt-24">
                        <p className="lg:text-5xl text-xl font-semibold">Спільними діями <br />
                            творіть країну майбутнього!</p>
                        <div className="text-center">
                            <p className="10 text-xl inline-block text-left font-semibold">Підтримайте важливі зміни <br />
                                станьте частиною великої справи!</p>
                        </div>
                        <div className="text-right">
                            <p className="lg:text-5xl text-xl inline-block text-left font-semibold">Заявіть про свій проект <br />
                                знайдіть команду і підтримку!</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between">
                        <button className=" px-4 lg:px-12 py-4 lg:py-2 my-4 text-xl lg:text-3xl rounded-2xl font-semibold bg-white text-purple-950"> Долучитись </button>
                        <button className=" px-4 lg:px-12 py-4 lg:py-2 my-4 text-xl lg:text-3xl rounded-2xl font-semibold bg-white text-purple-950"> Додати проект  </button>
                    </div>
                </div>
                <div className="bg-cover">
                    <video onContextMenu={(e) => e.preventDefault()} src="images/1screen_short.mp4" preload="auto" autoplay="true" loop="true" muted="muted" className="-z-10 w-full h-screen object-cover"></video>
                </div>
            </div>
        </div>
    )
}
