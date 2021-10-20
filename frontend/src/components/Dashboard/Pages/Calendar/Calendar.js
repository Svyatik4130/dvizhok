import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { createPopper } from '@popperjs/core';
import Popup from 'reactjs-popup';
import CalendarEventAlert from '../News/CalendarEventAlert';

export default function Calendar() {
    const [daysArr, setdaysArr] = useState([])
    const [announcements, setAnnouncements] = useState()
    const [date, setDate] = useState(new Date())
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth() + 1)
    const today = new Date()
    const [daysInMonth, setDaysInMonth] = useState(new Date(year, month, 0).getDate())
    const [dayOfWeekFirstDayMonth, setDayOfWeekFirstDayMonth] = useState(new Date(year, month - 1).getDay())
    const [dayOfWeekLastDayMonth, setDayOfWeekLastDayMonth] = useState(new Date(year, month, 0).getDay())

    const [yearNow, setyearNow] = useState(year)
    const monthUkr = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
    let daysInLastMonth = new Date(year, month - 1, 0).getDate()

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const changeDate = (givenDate) => {
        setDate(givenDate)
        setYear(givenDate.getFullYear())
        setMonth(givenDate.getMonth() + 1)
        setDaysInMonth(new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 0).getDate())
        setDayOfWeekFirstDayMonth(new Date(givenDate.getFullYear(), givenDate.getMonth() + 1 - 1).getDay())
        setdaysArr([])

        setDayOfWeekLastDayMonth(new Date(givenDate.getFullYear(), givenDate.getMonth() + 1, 0).getDay())
        daysInLastMonth = new Date(givenDate.getFullYear(), givenDate.getMonth() + 1 - 1, 0).getDate()
    }

    useEffect(() => {
        let prevmonth = []
        let thismonth = []
        let nextmonth = []
        if (dayOfWeekFirstDayMonth === 0) {
            daysInLastMonth -= 5
            if (month === 1) {
                if (today.getDate() === daysInLastMonth && today.getFullYear() === year - 1 && today.getMonth() === 11) {
                    prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false, istoday: true })
                } else {
                    prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false })
                }
            } else {
                if (today.getDate() === daysInLastMonth && today.getFullYear() === year && today.getMonth() + 2 === month) {
                    prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false, istoday: true })
                } else {
                    prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false })
                }
            }
            for (let i = 1; i < 6; i++) {
                daysInLastMonth++
                if (month === 1) {
                    if (today.getDate() === daysInLastMonth && today.getFullYear() === year - 1 && today.getMonth() === 11) {
                        prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false, istoday: true })
                    } else {
                        prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false })
                    }
                } else {
                    if (today.getDate() === daysInLastMonth && today.getFullYear() === year && today.getMonth() + 2 === month) {
                        prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false, istoday: true })
                    } else {
                        prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false })
                    }
                }
            }
            for (let i = 1; i < daysInMonth + 1; i++) {
                if (today.getDate() === i && today.getFullYear() === year && today.getMonth() + 1 === month) {
                    thismonth.push({ day: i, month, year, thismonth: true, istoday: true })
                } else {
                    thismonth.push({ day: i, month, year, thismonth: true })
                }
            }
        } else {
            if (dayOfWeekFirstDayMonth !== 1) {
                daysInLastMonth = daysInLastMonth - dayOfWeekFirstDayMonth + 2
                if (month === 1) {
                    if (today.getDate() === daysInLastMonth && today.getFullYear() === year - 1 && today.getMonth() === 11) {
                        prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false, istoday: true })
                    } else {
                        prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false })
                    }
                } else {
                    if (today.getDate() === daysInLastMonth && today.getFullYear() === year && today.getMonth() + 2 === month) {
                        prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false, istoday: true })
                    } else {
                        prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false })
                    }
                }
            }
            for (let i = 1; i < dayOfWeekFirstDayMonth - 1; i++) {
                daysInLastMonth++
                if (month === 1) {
                    if (today.getDate() === daysInLastMonth && today.getFullYear() === year - 1 && today.getMonth() === 11) {
                        prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false, istoday: true })
                    } else {
                        prevmonth.push({ day: daysInLastMonth, month: 12, year: year - 1, thismonth: false })
                    }
                } else {
                    if (today.getDate() === daysInLastMonth && today.getFullYear() === year && today.getMonth() + 2 === month) {
                        prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false, istoday: true })
                    } else {
                        prevmonth.push({ day: daysInLastMonth, month: month - 1, year, thismonth: false })
                    }
                }
            }
            for (let i = 1; i < daysInMonth + 1; i++) {
                if (today.getDate() === i && today.getFullYear() === year && today.getMonth() + 1 === month) {
                    thismonth.push({ day: i, month, year, thismonth: true, istoday: true })
                } else {
                    thismonth.push({ day: i, month, year, thismonth: true })
                }
            }
        }
        if (dayOfWeekLastDayMonth !== 0) {
            let neededDaysInNextMonth = 7 - dayOfWeekLastDayMonth
            for (let index = 0; index < neededDaysInNextMonth; index++) {
                if (month === 12) {
                    if (today.getDate() === index + 1 && today.getFullYear() === year + 1 && today.getMonth() === 0) {
                        nextmonth.push({ day: index + 1, month: 1, year: year + 1, thismonth: false, istoday: true })
                    } else {
                        nextmonth.push({ day: index + 1, month: 1, year: year + 1, thismonth: false })
                    }
                } else {
                    if (today.getDate() === index + 1 && today.getFullYear() === year && today.getMonth() === month) {
                        nextmonth.push({ day: index + 1, month: month + 1, year, thismonth: false, istoday: true })
                    } else {
                        nextmonth.push({ day: index + 1, month: month + 1, year, thismonth: false })
                    }
                }
            }
        }

        let calendarScreen = [...prevmonth, ...thismonth, ...nextmonth]

        const preloadOpps = async () => {
            const res = await axios.get("/story/get-all-stories")
            const advts = res.data.filter(news => news.storyType === "announcement")
            setAnnouncements(advts)
            advts.forEach(story => {
                const storyCreatedAt = new Date(story.createdAt)
                const neededDate = calendarScreen.findIndex(date => date.day === storyCreatedAt.getDate() && date.month === storyCreatedAt.getMonth() + 1 && date.year === storyCreatedAt.getFullYear())
                if (neededDate > -1) {
                    calendarScreen[neededDate].events = []
                    calendarScreen[neededDate].events.push(story)
                }
            })

            setdaysArr(calendarScreen)
        }
        preloadOpps()
    }, [date])

    const createTooltip = (index) => {
        const actBtn = document.getElementsByClassName(`btn-${index}`)[0]
        const tooltip = document.getElementsByClassName(`tooltip-${index}`)[0]
        if (tooltip.classList.contains("tooltip-data-show")) {
            tooltip.classList.remove("tooltip-data-show")
        } else {
            createPopper(actBtn, tooltip, {
                placement: 'right',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                ],
            });
            tooltip.classList.add("tooltip-data-show")
        }
    }

    return (
        <div className='h-full'>
            <div style={{ height: window.innerHeight - 105 }} className='flex'>
                <div className="w-9/12 pr-1 h-full">

                    {/* parent - flex flex-col h-full
                    child - flex-grow
                    это див до the bottom родителя */}
                    <div className="bg-white h-full flex flex-col rounded-3xl custom-shadow p-4">
                        <p className="text-2xl font-medium">{`${monthUkr[month - 1]} ${year}`}.</p>
                        <div className="w-full text-gray-400 text-center text-lg font-medium flex">
                            <div className="w-1/7">Пн</div>
                            <div className="w-1/7">Вт</div>
                            <div className="w-1/7">Ср</div>
                            <div className="w-1/7">Чт</div>
                            <div className="w-1/7">Пт</div>
                            <div className="w-1/7">Сб</div>
                            <div className="w-1/7">Нд</div>
                        </div>
                        <div className="flex flex-wrap flex-grow transition-all overflow-y-scroll pt-2">
                            {daysArr.map((date, index) => {
                                if (date.thismonth) {
                                    return (
                                        <div className={`w-1/7 p-1`}>
                                            <div className={`${date.istoday ? ("bg-purple-950 bg-opacity-5 h-full ") : (null)}`}>
                                                {date.istoday ? (<div className="w-full bg-purple-850 h-0.5 rounded-2xl"></div>) : (<div className="w-full bg-gray-300 h-0.5 rounded-2xl"></div>)}
                                                <p className={`font-medium ${date.istoday ? (" text-purple-850") : (null)}`}>{date.day}</p>
                                                {date.events ? (
                                                    <div className="relative">
                                                        <svg onClick={() => createTooltip(index)} className={`cursor-pointer btn-${index} hover:bg-gray-100 transition-all rounded-3xl`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                        <div className={`tooltip-${index} transition-all tooltip bg-gray-50 border custom-shadow rounded-2xl border-purple-950 p-4`}>
                                                            <div onClick={() => createTooltip(index)} className="absolute -top-2.5 -right-2 bg-white rounded-full hover:bg-opacity-90 transition-all"><svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                                                            {date.events.map(event => {
                                                                return (
                                                                    <CalendarEventAlert announcement={event} />
                                                                )
                                                            })
                                                            }</div>

                                                    </div>
                                                ) : (console.log(date))}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className={`w-1/7 p-2 text-gray-400`}>
                                            <div className={`${date.istoday ? ("bg-purple-950 bg-opacity-10 h-full ") : (null)}`}>
                                                <div className="w-full bg-gray-300 h-0.5 rounded-2xl"></div>
                                                <p className={`font-medium`}>{date.day}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-3/12 pr-1">
                    <div className="bg-white w-full custom-shadow rounded-3xl py-2">
                        <div className="m-auto pb-2 text-center text-purple-950 font-medium text-lg justify-center flex items-center">
                            <p onClick={() => setyearNow(yearNow - 1)} className="cursor-pointer hover:opacity-100 opacity-70 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg></p>
                            <p className="outline-none">{yearNow}</p>
                            <p onClick={() => setyearNow(yearNow + 1)} className="cursor-pointer hover:opacity-100 opacity-70 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48004B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6" /></svg></p>
                        </div>

                        <div className="flex flex-col text-purple-950">
                            <div className="flex justify-between px-2">
                                <p onClick={() => changeDate(new Date(yearNow, 0))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 0 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Січень</p>
                                <p onClick={() => changeDate(new Date(yearNow, 1))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 1 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Лютий</p>
                                <p onClick={() => changeDate(new Date(yearNow, 2))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 2 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Березень</p>
                            </div>
                            <div className="flex justify-between px-2">
                                <p onClick={() => changeDate(new Date(yearNow, 3))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 3 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Квітень</p>
                                <p onClick={() => changeDate(new Date(yearNow, 4))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 4 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Травень</p>
                                <p onClick={() => changeDate(new Date(yearNow, 5))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 5 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Червень</p>
                            </div>
                            <div className="flex justify-between px-2">
                                <p onClick={() => changeDate(new Date(yearNow, 6))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 6 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Липень</p>
                                <p onClick={() => changeDate(new Date(yearNow, 7))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 7 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Серпень</p>
                                <p onClick={() => changeDate(new Date(yearNow, 8))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 8 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Вересень</p>
                            </div>
                            <div className="flex justify-between px-2">
                                <p onClick={() => changeDate(new Date(yearNow, 9))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 9 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Жовтень</p>
                                <p onClick={() => changeDate(new Date(yearNow, 10))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 10 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Листопад</p>
                                <p onClick={() => changeDate(new Date(yearNow, 11))} className={`font-medium cursor-pointer bg-transparent transition-all rounded-2xl px-2 text-lg ${yearNow === year && month - 1 === 11 ? (" bg-purple-950 text-white") : ("text-purple-950")}`}>Грудень</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
