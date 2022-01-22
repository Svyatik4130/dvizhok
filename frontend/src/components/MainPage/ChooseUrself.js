import React from 'react'

export default function ChooseUrself() {
    return (
        <div className="w-full bg-purple-950 mt-14">
            <div className="m-auto text-white w-full pt-7">
                <p className="text-center text-3xl md:text-5xl font-bold">Оберіть для себе,хто Ви в майбутньому?</p>
            </div>
            <div className="pt-20 pb-10 flex flex-col lg:flex-row w-10/12 text-white m-auto">
                <div className="lg:w-4/12 w-full px-0 lg:pt-0 pt-0 lg:pr-12">
                    <div>
                        <p className=" text-2xl md:text-4xl font-semibold text-center mb-3">ОКтивіст</p>
                        <div className="h-0.5 w-full bg-pink-450 mb-3"></div>
                        <p className="text-center font-medium text-2xl"> Підтримую проекти діями, беру участь в добрих справах</p>
                    </div>
                </div>
                <div className="lg:w-4/12 w-full px-0 lg:pt-0 pt-12 lg:px-12">
                    <div>
                        <p className=" text-2xl md:text-4xl font-semibold text-center mb-3">Творець</p>
                        <div className="h-0.5 w-full bg-pink-450 mb-3"></div>
                        <p className="text-center font-medium text-2xl">Підтримую цікаві проекти на 100 грн щомісяця, впливаю на зміни в країні</p>
                    </div>
                </div>
                <div className="lg:w-4/12 w-full px-0 lg:pt-0 pt-12 lg:pl-12">
                    <div>
                        <p className=" text-2xl md:text-4xl font-semibold text-center mb-3">Лідер</p>
                        <div className="h-0.5 w-full bg-pink-450 mb-3"></div>
                        <p className="text-center font-medium text-2xl">Реалізую свій проект, збираю команду, гроші, шукаю підтримку. Очолюю зміни</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
