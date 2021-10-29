import React, { useEffect, useState } from 'react'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import EventCard from './EventCard';

export default function NewsNearMe({ news }) {
    const [curPosition, setCurPosition] = useState();
    const [newsNear, setnewsNear] = useState()
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const preloadOpps = async () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })

                    const nearme = news.filter(news => {
                        let isLatSuitable = false
                        let isLngSuitable = false
                        if (news.location[0] > position.coords.latitude - 1 && news.location[0] < position.coords.latitude + 1) {
                            isLatSuitable = true
                        }
                        if (news.location[1] > position.coords.longitude - 1 && news.location[1] < position.coords.longitude + 1) {
                            isLngSuitable = true
                        }
                        if (isLatSuitable && isLngSuitable) {
                            return true
                        } else {
                            return false
                        }
                    })
                    setnewsNear(nearme)
                    setisLoading(false)
                }, () => setisLoading(false)
            );
        }
        preloadOpps()
    }, [])
    if (isLoading) {
        return (
            <div className="w-full opacity-50">
                <div className="pt-5">
                    <SimpleLoader />
                </div>
            </div>
        )
    }
    if (!curPosition) {
        return (
            <div className="w-full opacity-50">
                <div className="">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                    <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Немає доступу до вашої поточної геопозіціі</p>
                </div>
            </div>
        )
    }
    if (!newsNear) {
        return (
            <div className="w-full opacity-50">
                <div className="">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="lg:h-72 h-56 block m-auto" />
                    <p className="font-medium text-center lg:text-4xl text-2xl text-purple-950">Поблизу немає жодної новини</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {newsNear.map(story => {
                return (
                    <div key={story._id}>
                        <EventCard story={story} />
                    </div>
                )
            })}
        </>
    )
}
