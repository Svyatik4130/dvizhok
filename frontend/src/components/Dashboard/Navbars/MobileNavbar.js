import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom"
import { loggedUser } from '../../../actions/UserActions'
import { NavLink } from "react-router-dom";

export default function MobileNavbar() {
    const userData = useSelector(state => state.userData)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        if (userData) {
            dispatch(loggedUser({
                token: undefined,
                user: undefined
            }))
            localStorage.setItem("auth-token", "")
            history.push("/")
        }
    }

    return (
        <nav className="fixed w-full z-50 bg-white">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a onClick={() => {history.push('/dashboard/profile/personal_info')}}><img
                                className="h-8"
                                src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png"
                                alt="Workflow"
                            /></a>
                        </div>
                        <div className="hidden xl:block">
                            <div className="ml-10 text-purple-950 text-xl font-semibold flex items-baseline">


                                <NavLink to={"/dashboard/profile"} className="transition-all z-50" activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 mt-7 mb-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/main.png" alt="lazy" className="element_main_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Головна</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/news"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/news.png" alt="lazy" className="element_news_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Стрічка новин</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/messages"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/message.png" alt="lazy" className="element_messages_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 break-words font-medium">Повідомлення</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/projects"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/projects.png" alt="lazy" className="element_projects_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Проекти</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/calendar"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/calendar.png" alt="lazy" className="element_calendar_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Календар подій</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/report"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/report.png" alt="lazy" className="element_report_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Звітність</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/idea"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/idea.png" alt="lazy" className="element_idea_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Ідея</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/blog"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/blog.png" alt="lazy" className="element_blog_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Блог</p>
                                    </div>
                                </NavLink>
                                <NavLink to={"/dashboard/faq"} activeClassName="active_desc_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/faq.png" alt="lazy" className="element_faq_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">FAQ</p>
                                    </div>
                                </NavLink>


                            </div>
                        </div>
                    </div>
                    <div className="items-center hidden xl:block">
                        {userData.user ? (
                            // <div>
                            //     <h1 className=" font-semibold">Вітаю, {userData.user.name}</h1>
                            //     <button onClick={logout} className="rounded-lg bg-red-600 text-white w-full">Вийти</button>
                            // </div>
                            <div className="flex justify-end pr-4">
                                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/users/+no_photo_user.png" alt="dvizhok_user" className="rounded-full w-14 border-2" />
                                <div className="ml-2">
                                    <p className="inline-block font-bold text-lg text-purple-850">{userData.user.name}</p>
                                    <p onClick={() => { history.push("/dashboard") }} className=" bg-yellow-350 hover:bg-yellow-400 transition-all text-black font-medium px-2 cursor-pointer rounded-2xl">Особистий кабінет</p>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => history.push('/signin')} className="px-12 py-2 my-4 text-xl rounded-2xl text-white bg-purple-950">Вхiд</button>
                        )
                        }
                    </div>
                    <div className="-mr-2 flex xl:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-purple-950 inline-flex items-center justify-center p-2 rounded-md text-gray-400"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block bg-colo h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="xl:hidden" id="mobile-menu">
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <div className="flex w-full justify-around">
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/profile"} className="transition-all z-50" activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/main.png" alt="lazy" className="element_main_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Головна</p>
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/news"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/news.png" alt="lazy" className="element_news_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Стрічка новин</p>
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/messages"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/message.png" alt="lazy" className="element_messages_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 break-words font-medium">Повідомлення</p>
                                    </div>
                                </NavLink>
                            </div>

                            <div className="flex w-full justify-around">
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/projects"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/projects.png" alt="lazy" className="element_projects_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Проекти</p>
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/calendar"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/calendar.png" alt="lazy" className="element_calendar_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Календар подій</p>
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/report"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/report.png" alt="lazy" className="element_report_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Звітність</p>
                                    </div>
                                </NavLink>
                            </div>

                            <div className="flex w-full justify-around">
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/idea"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/idea.png" alt="lazy" className="element_idea_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Ідея</p>
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/blog"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/blog.png" alt="lazy" className="element_blog_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">Блог</p>
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setIsOpen(false)} to={"/dashboard/faq"} activeClassName="active_mob_menu">
                                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/faq.png" alt="lazy" className="element_faq_image w-9 m-auto" />
                                        <p className="element_text text-center text-purple-950 font-medium">FAQ</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </nav >
    )
}
