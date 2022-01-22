import React from 'react'
import { useSelector } from 'react-redux'
import { createPopper } from '@popperjs/core';
import { useHistory } from 'react-router-dom'

export default function BellNotificator() {
    const notifications = useSelector(state => state.notifications).sort((a, b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        return bDate.getTime() - aDate.getTime()
    })
    const unviewedNotifications = notifications.filter(notification => !notification.isViewed)

    const history = useHistory()

    const createTooltip = () => {
        const actBtn = document.getElementsByClassName(`btn-tooltip`)[0]
        const tooltip = document.getElementsByClassName(`tooltip-tooltip`)[0]
        if (tooltip.classList.contains("tooltip-data-show")) {
            tooltip.classList.remove("tooltip-data-show")
        } else {
            createPopper(actBtn, tooltip, {
                placement: 'bottom',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [10, 20],
                        },
                    },
                ],
            });
            tooltip.classList.add("tooltip-data-show")
        }
    }
    return (
        <div className="pl-4 items-center flex-row relative">
            <svg onClick={() => createTooltip()} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#48004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
            <div className={`tooltip-tooltip z-40 w-32 lg:w-80  transition-all tooltip bg-gray-50 border custom-shadow rounded-2xl border-purple-950 p-2`}>
                <div onClick={() => createTooltip()} className="absolute -top-2.5 -right-2 bg-white rounded-full hover:bg-opacity-90 transition-all"><svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                <div className="max-h-96 overflow-y-scroll">
                    {notifications && (
                        notifications.map(notification => {
                            let image = <></>
                            let link = ""
                            switch (notification.type) {
                                case "new_dm":
                                    image = <svg xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    link = "/dashboard/messages/" + notification.link
                                    break;
                                case "new_news":
                                    image = <svg xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg>
                                    link = "/dashboard/news/all"
                                    break;
                                case "new_support":
                                    image = <svg xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    link = "/dashboard/projects/" + notification.link
                                    break;
                                default:
                                    image = <svg xmlns="http://www.w3.org/2000/svg" className="flex-grow-0 flex-shrink-0" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                    break;
                            }
                            return (
                                <div onClick={() => history.push(link)} className={`flex items-center gap-2 bg-gray-200 transition-all hover:shadow-inner shadow-none cursor-pointer rounded-xl p-2 mb-2 ${!notification.isViewed && ("animate-pulse")}`}>
                                    {image}
                                    <p className="font-medium">{notification.text}</p>
                                </div>
                            )
                        })
                    )}

                </div>
            </div>

            {unviewedNotifications.length > 0 && (
                <div className="absolute bg-purple-950 w-2 h-2 rounded-full top-0 right-0 animate-ping"></div>
            )}
        </div>
    )
}
