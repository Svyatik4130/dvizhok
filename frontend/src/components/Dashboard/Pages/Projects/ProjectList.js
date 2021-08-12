import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import ErrorNotice from '../../../misc/ErrorNotice';
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';

export default function ProjectList() {
    const [error, setError] = useState()
    const [AllProjects, setAllProjects] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const getProjects = await axios.get('/project/get-all-projects')
                setAllProjects(getProjects.data)

                setisLoading(false)
            } catch (error) {
                error.response.data.msg && setError(error.response.data.msg)
            }
        }
        getAllProjects()
    }, [])

    if (isLoading) {
        return <SimpleLoader />
    }

    return (
        <>
            <div className="px-12 m-auto">
                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
            </div>
            <div className="w-full h-full flex">
                <div className="w-9/12 flex flex-wrap overflow-y-scroll h-full">
                    {AllProjects.map((project) => {
                        return (
                            <div className=" h-124 w-3/12 p-1">
                                <div className="w-full h-full bg-white rounded-xl">
                                    <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns">
                                        {project.photosNvideos.map((source) => {
                                            const ext = source.split('.')[source.split('.').length - 1]
                                            console.log(ext)
                                            if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
                                                return (
                                                    <div className="mb-8 rounded-t-xl h-36" style={{ backgroundImage: `url(${source})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto 144px', backgroundPosition: 'center' }}>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="pb-8">
                                                        <video className="rounded-t-xl" controls>
                                                            <source src={source} key={source}></source>
                                                            Your browser does not support HTML5 video.
                                                        </video>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </Carousel>

                                    <div className="p-2">
                                        <p className="font-semibold text-sm mb-1">{project.projectName}</p>
                                        <p className="font-medium text-xs overflow-y-scroll">{project.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-3/12 pl-7">
                    <input type="text" className="w-full text-lg font-medium p-3 px-4 rounded-full outline-none" placeholder="Пошук проектів" />
                </div>
            </div>
        </>
    )
}
