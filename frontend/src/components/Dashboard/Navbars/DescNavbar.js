import React from 'react'
import { NavLink } from "react-router-dom";

export default function DescNavbar() {
    return (
        <div className="h-screen fixed w-1/12 bg-white rounded-r-3xl">
            <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png" className=" w-16 m-auto pt-4" alt="dvizhok_logo" />

            {/* menu */}
            <div>
                <NavLink exact to={"/dashboard"} className="transition-all" activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 mt-7 mb-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/main.png" className="element_main_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Головна</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/news"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/news.png" className="element_news_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Стрічка новин</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/messages"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/message.png" className="element_messages_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Повідомлення</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/projects"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/projects.png" className="element_projects_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Проекти</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/calendar"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/calendar.png" className="element_calendar_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Календар подій</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/report"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/report.png" className="element_report_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Звітність</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/idea"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/idea.png" className="element_idea_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Ідея</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/blog"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/blog.png" className="element_blog_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">Блог</p>
                    </div>
                </NavLink>
                <NavLink exact to={"/dashboard/faq"} activeClassName="active_desc_menu">
                    <div className="element_wrapper transition-all left-0 p-2 my-2 rounded-3xl">
                        <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/faq.png" className="element_faq_image w-9 m-auto" />
                        <p className="element_text text-center text-purple-950 font-medium">FAQ</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
