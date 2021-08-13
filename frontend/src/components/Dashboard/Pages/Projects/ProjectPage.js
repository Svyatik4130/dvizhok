import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Carousel } from 'react-responsive-carousel';

export default function ProjectPage() {
    let { id } = useParams()
    const [Project, setProject] = useState()
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const receivingExactProject = async () => {
            try {
                const payload = { id }
                const exactProject = await axios.post("/project/get-exact-projects", payload)
                setProject(exactProject.data[0])

                setisLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        receivingExactProject()
    }, [])

    if (isLoading) {
        return (
            <div className="h-screen">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <div className="w-4/5 overflow-y-scroll pr-8">
            <div style={{ height: window.innerHeight - 96, marginTop: "96px" }} className="fixed p-4 rounded-l-3xl overflow-y-scroll bg-white top-0 right-0 h-full w-1/5">
                <p className="text-2xl font-bold text-purple-950 text-center">Зібрано, грн</p>



            </div>
            <div className="bg-white rounded-3xl p-4">
                <p className="text-2xl font-bold text-purple-950 text-center">{Project.projectName}</p>
                <div className="font-medium text-lg w-6/12">
                    <p>Тип проекту: <strong className=" uppercase">{Project.category}</strong></p>
                    <p>Місце реалізації: <strong className=" uppercase">{Project.category}</strong></p>
                    <button className="w-full mt-3 bg-yellow-350 text-center py-2 rounded-2xl inline-flex text-2xl font-medium text-purple-950 items-center justify-center">Підтримати <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/pay.png" className="h-9 ml-2" alt="support" /> </button>
                </div>
                <p className="text-lg font-medium mt-3">
                    <div className="float-right w-6/12 -mt-28">
                        <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns pl-3">
                            {Project.photosNvideos.map((source) => {
                                const ext = source.split('.')[source.split('.').length - 1]
                                console.log(ext)
                                if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
                                    return (
                                        <div className="mb-9 mx-8 h-56 responsive-image-bgImgUrl" style={{ backgroundImage: `url(${source})` }}>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="pb-9 px-8">
                                            <video controls>
                                                <source src={source} key={source}></source>
                                                Your browser does not support HTML5 video.
                                            </video>
                                        </div>
                                    )
                                }
                            })}
                        </Carousel>
                    </div>
                    <strong className=" font-semibold text-2xl">ІСТОРІЯ</strong><br />
                    {Project.description}
                </p>
            </div>
        </div>
    )
}
