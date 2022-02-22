import React, { useState, useEffect } from 'react'
import DescNavbar from './Navbars/DescNavbar'
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Loading from '../Loaders/loading';
import DescTopMenu from './Navbars/DescTopMenu';
import { useSelector, useDispatch } from 'react-redux'
import ProfilePage from './Pages/Profile/ProfilePage';
import Projects from './Pages/Projects/Projects';
import axios from 'axios'
import { addMyProjects } from '../../actions/ProjectActions'
import { addAllNotifications } from '../../actions/AddNotifications'
import Loader from '../Loaders/loading'
import MobileNavbar from './Navbars/MobileNavbar';
import UserPage from './Pages/UserPage/UserPage';
import { getSignature } from '../helpers/browser-key'
import Messenger from './Pages/Messenger/Messenger';
import Calendar from './Pages/Calendar/Calendar';
import News from './Pages/News/News';

export default function Index() {
    const [IsLoading, setIsLoading] = useState(0)
    const [isDataReceived, setisDataReceived] = useState(false)
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)
    const signature = getSignature()
    const history = useHistory()

    useEffect(() => {
        if (window.location.href.split("/")[window.location.href.split("/").length - 2] == "projects" && window.location.href.split("/")[window.location.href.split("/").length - 3] == "dashboard") {
            console.log(window.location.href.split("/")[window.location.href.split("/").length - 2] == "projects" && window.location.href.split("/")[window.location.href.split("/").length - 3] == "dashboard")
            history.push(`/guest/projects/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`)
        } else if (!userData.user) {
            history.push("/signup/")
        }

        const preloadOpps = async () => {
            try {
                let token = localStorage.getItem("auth-token")
                const myProjects = await axios.get("/project/get-my-projects", { headers: { "x-auth-token": token, "secret": signature } })
                dispatch(addMyProjects(myProjects.data))

                const myNotifications = await axios.get("/notifications/get-my-notifications", { headers: { "x-auth-token": token, "secret": signature } })
                console.log(myNotifications.data)
                dispatch(addAllNotifications(myNotifications.data))

                setisDataReceived(true)
            } catch (error) {
                console.log(error)
            }
        }
        preloadOpps()
    }, [])

    if (!isDataReceived) {
        return <Loader />
    }

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


            <div onLoad={() => { setIsLoading(IsLoading + 1) }} className="lg:w-1/9 w-0">
                <div className="hidden lg:block">
                    <DescNavbar />
                </div>
                <div className="lg:hidden">
                    <MobileNavbar />
                </div>
            </div>
            <div className="lg:w-8/9 w-full">
                {userData.user ? (
                    <DescTopMenu />
                ) : (
                    null
                )
                }
                <div className="lg:pt-20 pt-5">
                    <Switch>
                        <Route path="/dashboard/profile/">
                            <ProfilePage />
                        </Route>
                        <Route path="/dashboard/userpage/:id" children={<UserPage />}>
                        </Route>
                        <Route path="/dashboard/news">
                            <News />
                        </Route>
                        <Route path="/dashboard/messages">
                            <Messenger />
                        </Route>
                        <Route path="/dashboard/projects">
                            <Projects />
                        </Route>
                        <Route path="/dashboard/calendar">
                            <Calendar />
                        </Route>
                        <Route path="/dashboard">
                            <Redirect to="/dashboard/profile/personal_info" />
                        </Route>
                    </Switch>
                </div>
            </div>

            <div className="hidden">
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/main_active.png" alt="lazy" />
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/news_active.png" alt="lazy" />
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/message_active.png" alt="lazy" />
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/project_active.png" alt="lazy" />
                <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/nav_icons/active/calendar_active.png" alt="lazy" />
            </div>
        </div>
    )
}
