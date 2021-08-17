import React from 'react'
import Info from './Info'
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Personal_Info from './Personal_Info';
import About_Myself from './About_Myself';
import Potential from './Potential';
import Change_Pass from './Change_Pass';

export default function ProfilePage() {
    return (
        <div className="w-full pt-0 lg:pt-10 lg:px-6 px-3" style={{ height: window.innerHeight - 100 }}>
            <Info />
            <div className="w-full" style={{ height: window.innerHeight - 300 }} >
                <div className="lg:w-7/12 w-11/12 text-sm items-stretch flex rounded-t-xl font-medium lg:text-lg" style={{ backgroundColor: "#DDDDDD" }}>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/personal_info"} className="w-3/12 text-center py-2 rounded-tl-xl border-r-2">
                        Особиста інфо
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/about_myself"} className="w-3/12 py-2 text-center  border-r-2">
                        Про себе
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/potential"} className="w-3/12 text-center py-2 border-r-2">
                        Ваш потенціал
                    </NavLink>
                    <NavLink activeClassName="bg-white" to={"/dashboard/profile/change_pass"} className="w-3/12 text-center py-2 rounded-tr-xl">
                        Зміна паролю
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/dashboard/profile/personal_info">
                        <div style={{ height: window.innerHeight - 350 }} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <Personal_Info />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/about_myself">
                        <div style={{ height: window.innerHeight - 350 }} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <About_Myself />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/potential">
                        <div style={{ height: window.innerHeight - 350 }} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
                            <Potential />
                        </div>
                    </Route>
                    <Route path="/dashboard/profile/change_pass">
                        <div style={{ height: window.innerHeight - 350 }} className="w-full overflow-y-scroll rounded-b-xl rounded-tr-xl bg-white">
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
