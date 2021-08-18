import React, { useState } from 'react'
import ErrorNotice from '../../../misc/ErrorNotice';
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProjectList() {
    const [error, setError] = useState()
    const allProjects = useSelector(state => state.allProjects)
    const [isLoading, setisLoading] = useState(false)
    const history = useHistory()


    const sentToProjectPage = (id) => {
        history.push(`/dashboard/projects/${id}`)
    }

    if (isLoading) {
        return <SimpleLoader />
    }

    return (
        <>
            <div className="px-12 m-auto">
                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
            </div>
            <div className="w-full h-full flex lg:flex-row flex-col ">
                <div className="lg:w-9/12 w-full order-2 lg:order-1 flex flex-wrap overflow-y-scroll h-full border-2 border-purple-200 rounded-xl">
                    {allProjects.map((project) => {
                        return (
                            <div className=" h-124 lg:w-3/12 md:w-6/12 w-full md:p-1 p-2">
                                <div className="w-full h-full bg-white rounded-xl relative">
                                    <div onClick={() => sentToProjectPage(project._id)} className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
                                        <div className="w-full text-center absolute bottom-0">
                                            <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                            <p className="font-medium z-10 relative text-white py-1">{project.category}</p>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <a onClick={() => sentToProjectPage(project._id)} className="font-semibold cursor-pointer underline text-sm mb-1">{project.projectName}</a>
                                        <p className="font-medium text-xs overflow-y-scroll h-56">{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="lg:w-3/12 w-full lg:pl-7 pl-0 pb-4 lg:pb-0 order-1 lg:order-2">
                    <input type="text" className="w-full text-lg font-medium p-3 px-4 rounded-full outline-none" placeholder="Пошук проектів" />
                </div>
            </div>
        </>
    )
}
