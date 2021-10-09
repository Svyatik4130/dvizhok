import React from 'react'
import { useSelector } from 'react-redux'
import EventCard from './EventCard';
import SidebarEventAlert from './SidebarEventAlert';

export default function News() {
    const userData = useSelector(state => state.userData)

    return (
        <div className='w-full'>
            <div className="flex"></div>
            <div className="flex">
                <div className="w-2/12 p-0.5">
                    <div className=" border rounded-3xl border-purple-950">
                        <p className="font-semibold text-lg text-center text-purple-950 p-2">Сьогодні</p>

                        <SidebarEventAlert />
                    </div>
                </div>
                <div className="w-6/12 p-0.5 pl-2">

                    <EventCard />
                </div>
                <div className="w-4/12 p-0.5">
                    <div className=" border rounded-3xl border-purple-950">
                        <p className="font-semibold text-lg text-center text-purple-950 p-2">ТОП 10 Проектів ОК</p>
                        <div className="w-full flex flex-wrap">

                            <div className="w-3/6 p-1">
                                <div className="bg-white rounded-2xl h-52">
                                    <div className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">Література, Фестиваль</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-sm projectName-text truncate-text-3 px-2">Книжковий фестиваль "Book Space" у Дніпрі Книжковий фестиваль Книжковий фестиваль Книжковий фестиваль</p>
                                </div>
                            </div>
                            <div className="w-3/6 p-1">
                                <div className="bg-white rounded-2xl h-52">
                                    <div className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${userData.user.avaUrl})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">Література, Фестиваль</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-sm projectName-text truncate-text-3 px-2">Книжковий фестиваль "Book Space" у Дніпрі Книжковий фестиваль Книжковий фестиваль Книжковий фестиваль</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
