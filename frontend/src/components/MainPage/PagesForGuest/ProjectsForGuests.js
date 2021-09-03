import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Fuse from 'fuse.js'
import { useHistory } from 'react-router-dom'

export default function ProjectsForGuests() {
    const allProjects = useSelector(state => state.allProjects)
    const history = useHistory()
    const [searchText, setSearchText] = useState('')
    const [inputStyle, setInputStyle] = useState("rounded-3xl bg-gray-100")
    const [findedProjects, setFindedProjects] = useState(null)

    const sentToProjectPage = (id) => {
        history.push(`/guest/projects/${id}`)
    }

    useEffect(() => {
        const options = {
            minMatchCharLength: 3,
            keys: [
                "projectName"
            ]
        }
        const fuse = new Fuse(allProjects, options)
        const findedItems = fuse.search(searchText)
        setFindedProjects(findedItems)

        if (findedItems.length > 0) {
            setInputStyle("rounded-3xl bg-white")
        } else {
            setInputStyle("rounded-3xl bg-gray-100")
        }
    }, [searchText])

    return (
        <div className="p-10 pt-20">
            <div className="w-full h-full flex lg:flex-row flex-col ">
                <div className="lg:w-9/12 w-full order-2 lg:order-1 flex flex-wrap lg:overflow-y-scroll h-full lg:border-2 border-gray-300 rounded-xl">
                    {allProjects.map((project) => {
                        return (
                            <div className="h-124 lg:w-3/12 md:w-6/12 w-full md:p-1 p-2">
                                <div className="w-full h-full bg-white rounded-xl relative">
                                    <div onClick={() => sentToProjectPage(project._id)} className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">{project.category}</p>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <a onClick={() => sentToProjectPage(project._id)} className="font-semibold projectName-text cursor-pointer underline text-sm mb-1 break-words">{project.projectName}</a>
                                        <p className="font-medium text-xs overflow-y-scroll break-words h-56">{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="lg:w-3/12 w-full lg:pl-3 pl-0 pb-4 lg:pb-0 order-1 lg:order-2">
                    <div className="relative">
                        <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" className={`${inputStyle} w-full transition-all text-lg relative z-20 font-medium p-3 px-4 rounded-full outline-none focus:bg-white`} placeholder="Пошук проектів" />
                        {/* <input value={searchText} onChange={(e) => setsearchText(e.target.value)} type="text" className={`${inputStyle} transition-all relative z-20 px-3 py-2 w-full outline-none focus:bg-white`} placeholder="Пошук ваших чатів та користувачів" /> */}
                        <div className="rounded-3xl drop-shadow-lg mt-1.5 max-h-96 p-2 overflow-y-scroll absolute h-auto transition-all pt-9 top-0 w-full bg-white">
                            {findedProjects ? (
                                findedProjects.map(({ item }) => {
                                    return (
                                        <div onClick={() => sentToProjectPage(item._id)} className="flex mt-3 pretty-shadow cursor-pointer p-2 rounded-xl">
                                            <div className="flex items-center min-w-0">
                                                <div className="w-14 h-14 flex-shrink-0 rounded-xl relative responsive-image-bgImgUrl" style={{ backgroundImage: `url(${item.logoUrl[0]})` }}>
                                                </div>
                                                <div className="ml-2 truncate">
                                                    <a className="font-semibold text-lg">{item.projectName}</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
