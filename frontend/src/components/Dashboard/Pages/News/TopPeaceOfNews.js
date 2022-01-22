import React from 'react'
import { useHistory } from "react-router-dom"

export default function TopPeaceOfNews({ project }) {
    const history = useHistory()

    return (
        <div className="w-3/6 p-1">
            <div className="bg-white rounded-2xl h-52">
                <div onClick={() => history.push(`/dashboard/projects/${project._id}`)} className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 hover:opacity-80 opacity-100 transition-all" style={{ backgroundImage: `url(${project.logoUrl[0]})` }}>
                    <div className="w-full text-center absolute bottom-0">
                        <div className="absolute w-full h-full bg-purple-950 opacity-50 top-0"></div>
                        <p className="font-medium z-10 relative text-white py-1">{project.category}</p>
                    </div>
                </div>
                <p onClick={() => history.push(`/dashboard/projects/${project._id}`)} className="font-semibold cursor-pointer text-sm projectName-text truncate-text-3 px-2">{project.projectName}</p>
            </div>
        </div>
    )
}
