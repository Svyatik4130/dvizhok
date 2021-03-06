import React, { useEffect, useState } from 'react'
import axios from "axios";
import EventCard from '../News/EventCard';

export default function ProjectsNews({ projId, lastNewsId }) {
    const [projectNews, setprojectNews] = useState()
    useEffect(() => {
        const preloadOpps = async () => {
            const res = await axios.get(`/story/get-stories/${projId}`)
            setprojectNews(res.data.filter(story => story.storyType === "news").sort((a, b) => {
                const aDate = new Date(a.createdAt)
                const bDate = new Date(b.createdAt)
                return bDate.getTime() - aDate.getTime()
            }))
        }
        preloadOpps()
    }, [lastNewsId])

    return (
        <div className="flex flex-col bg-white rounded-3xl overflow-y-scroll h-196">
            <p className="text-2xl text-center py-1 font-semibold text-purple-950">Новини Проекту</p>
            <div className="w-full h-0.5 bg-gray-300 mb-1"></div>
            <div className="flex-grow overflow-y-scroll">
                {projectNews?.length > 0 ? (
                    projectNews.map(story => {
                        return (
                            <div className="px-2 mb-2">
                                <div className="custom-shadow rounded-3xl">
                                    <EventCard story={story} />
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="w-full opacity-50">
                        <div className="">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                            <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">У цьому проекті ще немає новин</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
