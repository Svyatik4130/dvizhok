import React from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel';

export default function MyProjects() {
    const myProjects = useSelector(state => state.myProjects)

    return (
        <div className="w-full h-full flex">
            <div className="w-9/12 flex flex-wrap overflow-y-scroll h-full">
                {myProjects.map((project) => {
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
    )
}
