import React from 'react'
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { loggedUser } from '../../../actions/UserActions'

export default function DescNavbar() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)

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
        <div className="hide-scrollbar h-screen overflow-y-scroll fixed w-1/9">
            <div className="relative bg-white min-h-screen rounded-r-3xl w-11/12 flex flex-col justify-between">
                {/* menu */}
                <div>
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png" className=" w-16 m-auto pt-4" alt="dvizhok_logo" />
                    {/* <NavLink to={"/dashboard/profile"} className="transition-all z-50" activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 mt-7 mb-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/main.png" alt="lazy" className="element_main_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Головна</p>
                        </div>
                    </NavLink> */}
                    <NavLink to={"/dashboard/news"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 mt-7 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/news.png" alt="lazy" className="element_news_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Стрічка новин</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/messages"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/message.png" alt="lazy" className="element_messages_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 break-words font-medium">Повідомлення</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/projects"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/projects.png" alt="lazy" className="element_projects_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Проекти</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/calendar"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/calendar.png" alt="lazy" className="element_calendar_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Календар подій</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/report"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/report.png" alt="lazy" className="element_report_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Звітність</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/idea"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/idea.png" alt="lazy" className="element_idea_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Ідея</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/blog"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/blog.png" alt="lazy" className="element_blog_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">Блог</p>
                        </div>
                    </NavLink>
                    <NavLink to={"/dashboard/faq"} activeClassName="active_desc_menu">
                        <div className="element_wrapper pretty-shadow-noBg transition-all left-0 p-2 my-2 rounded-3xl">
                            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/faq.png" alt="lazy" className="element_faq_image w-9 m-auto" />
                            <p className="element_text text-center text-purple-950 font-medium">FAQ</p>
                        </div>
                    </NavLink>
                </div>
                <div onClick={logout} className="w-full mb-2 cursor-pointer text-center p-3">
                    <p className="rounded-3xl bg-red-600 text-white hover:bg-red-500 w-full py-1">Вийти</p>
                </div>
            </div>
        </div>
    )
}
