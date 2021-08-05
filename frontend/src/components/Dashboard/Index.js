import React, { useState } from 'react'
import DescNavbar from './Navbars/DescNavbar'
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from '../Loaders/loading';
import DescTopMenu from './Navbars/DescTopMenu';
import { useSelector } from 'react-redux'
import ProfilePage from './Pages/Profile/ProfilePage';

export default function Index() {
    const [IsLoading, setIsLoading] = useState(0)
    const userData = useSelector(state => state.userData)

    return (
        <div className="flex">
            {/* ImageLoader. 10 - represents number of menu elements */}
            {IsLoading < 10 ? (
                <div className="fixed z-40 w-screen h-screen">
                    <Loading />
                </div>
            ) : (
                null
            )
            }


            <div onLoad={() => { setIsLoading(IsLoading + 1) }} className="w-1/9">
                <DescNavbar />
            </div>
            <div className="w-8/9">
                {userData.user ? (
                    <DescTopMenu />
                ) : (
                    null
                )
                }
                <div className="pt-20">
                    <Switch>
                        <Route path="/dashboard/profile/">
                            <ProfilePage />
                        </Route>
                        <Route path="/dashboard/news">
                            <div>news</div>
                        </Route>
                        <Route path="/dashboard/messages">
                            <div>messages</div>
                        </Route>
                        <Route path="/dashboard/projects">
                            <div>projects</div>
                        </Route>
                        <Route path="/dashboard/calendar">
                            <div>calendar</div>
                        </Route>
                        <Route path="/dashboard">
                            <Redirect to="/dashboard/profile/personal_info" />
                        </Route>
                    </Switch>
                </div>
            </div>

            <div className="hidden">
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/main_active.png"  alt="lazy"/>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/news_active.png"  alt="lazy"/>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/message_active.png"  alt="lazy"/>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/project_active.png"  alt="lazy"/>
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/calendar_active.png"  alt="lazy"/>
            </div>
        </div>
    )
}