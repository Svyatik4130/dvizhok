import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Info from './Info'
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import Personal_Info from './Personal_Info';
import About_Myself from './About_Myself';
import Potential from './Potential';
import Change_Pass from './Change_Pass';
import ErrorNotice from '../../../misc/ErrorNotice';

export default function ProfilePage() {
    const [responsiveStyles, setresponsiveStyles] = useState({})
    const [stylesForPotentialBtn, setstylesForPotentialBtn] = useState("")
    const [error, setError] = useState()

    const userData = useSelector(state => state.userData)

    useEffect(() => {
        if (document.documentElement.clientWidth >= 1024) {
            setresponsiveStyles({ height: document.documentElement.clientHeight - 350 })
        }

        const preloadOpps = async () => {
            try {
                if (userData.user.role > 0) {
                    const lastTransaction = await axios.get(`/payments/get-last-transaction/${userData.user.id}`)

                    const lastPayDate = new Date(lastTransaction.data.createdAt)
                    lastPayDate.setMonth(lastPayDate.getMonth() + 1)
                    lastPayDate.setDate(lastPayDate.getDate() - 4)
                    const dateNow = new Date()
                    if (lastPayDate.getMonth() === dateNow.getMonth() && dateNow.getTime() > lastPayDate.getTime()) {
                        setstylesForPotentialBtn("animate-pulse bg-red-700 text-white")
                    }
                }
            } catch (error) {
                console.log(error)
                setError(error.response.data.msg)
            }
        }
        preloadOpps()
    }, [])

    return (
        <div className="w-full pt-0 lg:pt-10 lg:px-6 px-3" style={{ height: window.innerHeight - 100 }}>
            <Info />
            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
            <div className="w-full" style={{ height: window.innerHeight - 300 }} >
                <div className="lg:w-7/12 w-11/12 text-sm items-stretch flex rounded-t-xl font-medium lg:text-lg" style={{ backgroundColor: "#DDDDDD" }}>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/personal_info"} className="w-3/12 text-center py-2 rounded-tl-xl border-r-2">
                        Особиста інфо
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/about_myself"} className="w-3/12 py-2 text-center  border-r-2">
                        Про себе111111
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/potential"} className={`w-3/12 text-center py-2 border-r-2 ${stylesForPotentialBtn}`}>
                        Ваш потенціал
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/change_pass"} className="w-3/12 text-center py-2 rounded-tr-xl">
                        Зміна паролю
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/dashboard/profile/personal_info">
                        <div style={responsiveStyles} className="w-full lg:overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <Personal_Info />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/about_myself">
                        <div style={responsiveStyles} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <About_Myself />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/potential">
                        <div style={responsiveStyles} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <Potential />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/change_pass">
                        <div style={responsiveStyles} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <Change_Pass />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/">
                        <Redirect to="/dashboard/profile/personal_info" />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
