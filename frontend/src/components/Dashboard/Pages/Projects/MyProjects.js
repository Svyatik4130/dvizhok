import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function MyProjects() {
    const myProjects = useSelector(state => state.myProjects)
    const history = useHistory()
    console.log(myProjects)

    const sentToProjectPage = (id) => {
        history.push(`/dashboard/projects/${id}`)
    }

    return (
        <div className="w-full h-full flex">
            <div className="w-9/12 flex flex-wrap overflow-y-scroll h-full border-2 border-purple-200 rounded-xl">
                {
                    myProjects[0] === undefined ? (
                        <div className="w-full h-full relative opacity-50">
                            <div className="absolute center-content">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-72 block m-auto" />
                                <p className="font-medium text-center text-4xl text-purple-950">Ви ще не створили жодного проекту. Станьте Творцем і створіть свій проект!</p>
                            </div>
                        </div>
                    ) : (
                        myProjects.map((project) => {
                            return (
                                <div className=" h-124 w-3/12 p-1">
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
                        })
                    )
                }
            </div>
            <div className="w-3/12 pl-7">
                <input type="text" className="w-full text-lg font-medium p-3 px-4 rounded-full outline-none" placeholder="Пошук проектів" />
            </div>
        </div>
    )
}



// return (
//     <div className=" h-124 w-3/12 p-1">
//         <div className="w-full h-full bg-white rounded-xl">
//             <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns">
//                 {project.photosNvideos.map((source) => {
//                     const ext = source.split('.')[source.split('.').length - 1]
//                     console.log(ext)
//                     if (ext == "jpeg" || ext == 'jpg' || ext == 'png') {
//                         return (
//                             <div className="mb-8 rounded-t-xl h-36" style={{ backgroundImage: `url(${source})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto 144px', backgroundPosition: 'center' }}>
//                             </div>
//                         )
//                     } else {
//                         return (
//                             <div className="pb-8">
//                                 <video className="rounded-t-xl" controls>
//                                     <source src={source} key={source}></source>
//                                     Your browser does not support HTML5 video.
//                                 </video>
//                             </div>
//                         )
//                     }
//                 })}
//             </Carousel>

//             <div className="p-2">
//                 <p className="font-semibold text-sm mb-1">{project.projectName}</p>
//                 <p className="font-medium text-xs overflow-y-scroll">{project.description}</p>
//             </div>
//         </div>
//     </div>
// )