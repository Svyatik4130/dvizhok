import React from 'react'

export default function Intro2ndScreen() {
    return (
        <div>
            <div className="w-10/12 m-auto mt-8">
                <p className="text-center text-2xl lg:text-5xl text-purple-950 font-semibold">Двигун змін в країні</p>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/bigLogo.png" alt="big_logo" className="lg:h-32 w-full lg:w-auto m-auto mt-6" />
                <p className="text-center text-purple-950 hidden lg:block text-3xl mt-6 font-medium">Децентралізована платформа масового <br />
                    краудфандингу де зустрічаються ідеї, люди та ресурси<br />
                    для зміни навколишнього світу на краще</p>
                <p className="text-center text-purple-950 lg:hidden text-xl mt-6 font-medium">Децентралізована платформа масового
                    краудфандингу де зустрічаються ідеї, люди та ресурси
                    для зміни навколишнього світу на краще</p>
            </div>
            <div className="flex w-full lg:w-10/12 m-auto mt-12 items-center lg:flex-row flex-col">
                <div className=" w-full mt-4 lg:mt-0 lg:w-4/12 px-4">
                    <div className="rounded-3xl bg-white p-5">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/share.png" className="m-auto" alt="МЕРЕЖА ТВОРЦІВ" />
                        <p className="uppercase mt-11 text-center text-lg text-purple-950 font-bold">МЕРЕЖА ТВОРЦІВ</p>
                        <p className="mt-5 text-center text-lg text-gray-400 font-medium">Ми гуртуємо людей, які не чекають дива, а самі творять дива. Творцям Омріяної Країни ми даємо мережеві можливості для спілкування, обміну досвідом, взаємної пдтримки та cпівпраці.</p>
                    </div>
                </div>
                <div className=" w-full mt-4 lg:mt-0 lg:w-4/12 px-4">
                    <div className="rounded-3xl bg-white p-5">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/leaf.png" className="m-auto" alt="ПЛАТФОРМА МОЖЛИВОСТЕЙ" />
                        <p className="uppercase mt-11 text-center text-lg text-purple-950 font-bold">ПЛАТФОРМА МОЖЛИВОСТЕЙ</p>
                        <p className="mt-5 text-center text-lg text-gray-400 font-medium">Ми надаємо можливості для реалізації проектів, що змінюють навколишній свт. Співфінансування, співорганізація, просування та популяризація ваших проектів, якщо вони відповідають цінностям ОК.</p>
                    </div>
                </div>
                <div className=" w-full mt-4 lg:mt-0 lg:w-4/12 px-4">
                    <div className="rounded-3xl bg-white p-5">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/partnership.png" className="m-auto" alt="СПІЛЬНОТА ОДНОДУМЦІВ" />
                        <p className="uppercase mt-11 text-center text-lg text-purple-950 font-bold">СПІЛЬНОТА ОДНОДУМЦІВ</p>
                        <p className="mt-5 text-center text-lg text-gray-400 font-medium">Ми об'єднуємося на базі цінностей та спільного бачення майбутнього. А з однодумцями, в просторі довіри будь-яка справа стає легшою, розвиток - приемнішим, Омріяна Країна - ближчою.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
