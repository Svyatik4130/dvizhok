import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';

export default function CreatedProjectsByUser() {
    let { id } = useParams()
    const [CreatedProjects, setCreatedProjects] = useState()
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const oppsBeforeMount = async () => {
            const getCreatedProjects = await axios.post("/project/get-created-projects-by-user", { id })
            setCreatedProjects(getCreatedProjects.data)
            console.log(getCreatedProjects.data)
            setisLoading(false)
        }
        oppsBeforeMount()
    }, [])

    const sentToProjectPage = (id) => {
        history.push(`/dashboard/projects/${id}`)
    }

    if (isLoading) {
        return <SimpleLoader />
    }

    return (
        <div className="flex flex-wrap">
            {CreatedProjects ? (
                <div className="w-full opacity-50">
                    <div className="">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                        <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Користувач ще не створив жодного проекту</p>
                    </div>
                </div>
            ) : (null)}
            {CreatedProjects.map((project) => {
                return (
                    <div className=" h-124 lg:w-4/12 md:w-6/12 w-full md:p-1 p-2">
                        <div className="w-full h-full bg-white rounded-xl relative custom-shadow">
                            <div onClick={() => sentToProjectPage(project._id)} className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
                                <div className="w-full text-center absolute bottom-0">
                                    <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                                    <p className="font-medium z-10 relative text-white py-1">{project.category}</p>
                                </div>
                            </div>

                            <div className="p-2">
                                <a onClick={() => sentToProjectPage(project._id)} className="font-semibold cursor-pointer underline text-sm mb-1 break-words">{project.projectName}</a>
                                <p className="font-medium text-xs overflow-y-scroll break-words h-56">{project.description}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
