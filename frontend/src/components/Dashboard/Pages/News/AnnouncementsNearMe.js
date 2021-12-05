import React, { useEffect, useState } from 'react'
import SimpleLoader from '../../../Loaders/SimpleLoader';
import { Carousel } from 'react-responsive-carousel';
import SidebarEventAlert from './SidebarEventAlert';

export default function AnnouncementsNearMe({ announcements }) {
    const [curPosition, setCurPosition] = useState();
    const [advrtsNear, setAdvrtsNear] = useState()
    const [advrtForMobNear, setadvrtForMobNear] = useState()

    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const preloadOpps = async () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })

                    const nearme = announcements.filter(announcement => {
                        let isLatSuitable = false
                        let isLngSuitable = false
                        if (announcement.location[0] > position.coords.latitude - 1 && announcement.location[0] < position.coords.latitude + 1) {
                            isLatSuitable = true
                        }
                        if (announcement.location[1] > position.coords.longitude - 1 && announcement.location[1] < position.coords.longitude + 1) {
                            isLngSuitable = true
                        }
                        if (isLatSuitable && isLngSuitable) {
                            return true
                        } else {
                            return false
                        }
                    })

                    let sortedAdvrts = []
                    nearme.forEach(advrt => {
                        const startDate = new Date(advrt.startDate)
                        const name_date = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`
                        const alreadyExistsINdex = sortedAdvrts.findIndex(dateWithEvents => dateWithEvents.dateString === name_date)
                        if (alreadyExistsINdex === -1) {
                            sortedAdvrts.push({ dateString: name_date, events: [], startDate })
                        }
                        sortedAdvrts[sortedAdvrts.length - 1].events.push(advrt)
                    })
                    const futureOnlyEvents = sortedAdvrts.filter(event => {
                        const dateNow = new Date()
                        const eventDate = new Date(event.startDate)
                        return dateNow.getTime() <= eventDate.getTime()
                    })
                    const advrForMobile = []
                    const advrForMobile3together = []
                    futureOnlyEvents.forEach(date => {
                        date.events.map(announcement => {
                            advrForMobile.push({ announcement, date: date.dateString })
                        })
                    })
                    for (let index = 0; advrForMobile3together?.[advrForMobile3together.length - 1]?.[advrForMobile3together?.[advrForMobile3together.length - 1].length - 1]?.announcement?._id !== advrForMobile?.[advrForMobile.length - 1]?.announcement?._id; index += 3) {
                        const together3 = []
                        together3.push(advrForMobile[index])
                        if (advrForMobile[index + 1]) together3.push(advrForMobile[index + 1])
                        if (advrForMobile[index + 2]) together3.push(advrForMobile[index + 2])
                        advrForMobile3together.push(together3)
                    }
                    setAdvrtsNear(futureOnlyEvents)
                    setadvrtForMobNear(advrForMobile3together)
                    setisLoading(false)
                }, () => setisLoading(false)
            );
        }
        preloadOpps()
    }, [])
    if (isLoading) {
        return (
            <>
                <div className="w-2/12 hidden lg:block order-1 p-0.5">
                    <div className="w-full opacity-50">
                        <div className="pt-5">
                            <SimpleLoader />
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden w-full order-2 p-0.5">
                    <div className="w-full opacity-50">
                        <div className="pt-5">
                            <SimpleLoader />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    if (!curPosition) {
        return (
            <>
                <div className="w-2/12 hidden lg:block order-1 p-0.5">
                    <div className="w-full border rounded-3xl border-purple-950 opacity-50">
                        <div className="">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-64 block m-auto" />
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden w-full order-2 p-0.5">
                    <div className="w-full border rounded-3xl border-purple-950 opacity-50">
                        <div className="">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-64 block m-auto" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    if (advrtsNear.length === 0) {
        return (
            <>
                <div className="w-2/12 hidden lg:block order-1 p-0.5">
                    <div className="w-full border rounded-3xl border-purple-950 opacity-50">
                        <div className="">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-64 block m-auto" />
                        </div>
                    </div>
                </div>
                <div className="block lg:hidden w-full order-2 p-0.5">
                    <div className="w-full border rounded-3xl border-purple-950 opacity-50">
                        <div className="">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-64 block m-auto" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="w-2/12 hidden lg:block order-1 p-0.5">
                <div className=" border rounded-3xl border-purple-950">
                    {advrtsNear.length > 0 ? (
                        advrtsNear.map(date => {
                            return (
                                <div className="px-1">
                                    <p className="font-semibold text-lg text-purple-950 text-center pt-2">{date.dateString}</p>
                                    {date.events.map(announcement => {
                                        return (
                                            <SidebarEventAlert announcement={announcement} />
                                        )
                                    })}
                                </div>
                            )
                        })
                    ) : (
                        <div className="w-full opacity-50">
                            <div className="">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png" alt="empty-folder" className="h-64 block m-auto" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="block lg:hidden w-full order-2 p-0.5">
                <Carousel autoPlay={false} showThumbs={false} showStatus={false} className="prpl-btns">
                    {advrtForMobNear.length > 0 ? (
                        advrtForMobNear.map(announcements3 => {
                            return (
                                <div className="flex justify-evenly pb-9">
                                    {announcements3.map(advrt => {
                                        return (
                                            <div>
                                                <div className="px-1">
                                                    <p className="font-semibold text-lg text-purple-950 text-center pt-2">{advrt.date}</p>
                                                    <SidebarEventAlert announcement={advrt.announcement} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    ) : (
                        <div className="w-full opacity-50">
                            <div className=" pb-4">
                                <div className="responsive-image-bgImgUrl cursor-pointer relative rounded-t-xl h-36 opacity-100 transition-all" style={{ backgroundImage: `url(https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/empty-folder.png)` }}></div>
                            </div>
                        </div>
                    )}
                </Carousel>
            </div>
        </>
    )
}
