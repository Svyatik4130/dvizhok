import React from 'react'
import EventCard from './EventCard'

export default function AllNews({ followedNews, setOrder }) {
    setOrder(3)

    return (
        followedNews.length > 0 ? (
            followedNews.map(story => {
                return <EventCard story={story} />
            })
        ) : (
            <div className="w-full opacity-50">
                <div>
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                    <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Ви ще не стежите за жодним проектом або проект не опублікував жодної новини. Підписуйтесь та підтримуйте проекти, і ви будете бачити їхні новини</p>
                </div>
            </div>
        )
    )
}
