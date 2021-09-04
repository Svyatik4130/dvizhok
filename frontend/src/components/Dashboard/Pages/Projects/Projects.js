import React from 'react'
import { useSelector } from 'react-redux';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import CreateProject from './CreateProject'
import GPSLocation from './GPSLocation';
import MyProjects from './MyProjects';
import ProjectList from './ProjectList';
import ProjectPage from './ProjectPage';

export default function Projects() {
    const userData = useSelector(state => state.userData)

    return (
        <div className="lg:px-6 px-2 lg:pt-4 pt-0">
            <Switch>
                <Route path="/dashboard/projects/createproject">
                    <div style={{ height: window.innerHeight - 100 }} className="w-full lg:overflow-y-scroll overflow-hidden rounded-xl p-4 bg-white">
                        <CreateProject />
                    </div>
                </Route>
                <Route path="/dashboard/projects/gps">
                    <div className="flex flex-wrap lg:ml-6 ml-0 mt-3 gap-2">
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl px-6 text-white font-medium text-lg py-2" to="/dashboard/projects/myprojects">
                            Мої проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/projectslist">
                            Всі проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/gps">
                            GPS Геолокація
                        </NavLink>
                        {userData.user.role < 1 ? (null) : (
                            <NavLink className="bg-yellow-350 rounded-2xl text-purple-950 px-6 font-medium text-lg py-2 hover:bg-yellow-300 pretty-shadow-noBg" to="/dashboard/projects/createproject">
                                + Створити проект
                            </NavLink>
                        )}
                    </div>
                    <div style={{ height: window.innerHeight - 160 }} className="w-full lg:overflow-y-scroll rounded-xl p-1">
                        <GPSLocation />
                    </div>
                </Route>
                <Route path="/dashboard/projects/myprojects">
                    <div className="flex flex-wrap lg:ml-6 ml-0 mt-3 gap-2">
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl px-6 text-white font-medium text-lg py-2" to="/dashboard/projects/myprojects">
                            Мої проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/projectslist">
                            Всі проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/gps">
                            GPS Геолокація
                        </NavLink>
                        {userData.user.role < 1 ? (null) : (
                            <NavLink className="bg-yellow-350 rounded-2xl text-purple-950 px-6 font-medium text-lg py-2 hover:bg-yellow-300 pretty-shadow-noBg" to="/dashboard/projects/createproject">
                                + Створити проект
                            </NavLink>
                        )}
                    </div>
                    <div style={{ height: window.innerHeight - 160 }} className="w-full lg:overflow-y-scroll rounded-xl lg:p-4 p-2">
                        <MyProjects />
                    </div>
                </Route>
                <Route path="/dashboard/projects/projectslist">
                    {/* project menu */}
                    <div className="flex flex-wrap lg:ml-6 ml-0 mt-3 gap-2">
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl px-6 text-white font-medium text-lg py-2" to="/dashboard/projects/myprojects">
                            Мої проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/projectslist">
                            Всі проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350 bg-opacity-90" className="bg-purple-950 hover:bg-opacity-90 pretty-shadow-noBg rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/gps">
                            GPS Геолокація
                        </NavLink>
                        {userData.user.role < 1 ? (null) : (
                            <NavLink className="bg-yellow-350 rounded-2xl text-purple-950 px-6 font-medium text-lg py-2 hover:bg-yellow-300 pretty-shadow-noBg" to="/dashboard/projects/createproject">
                                + Створити проект
                            </NavLink>
                        )}
                    </div>
                    <div style={{ height: window.innerHeight - 160 }} className="w-full lg:overflow-y-scroll rounded-xl lg:p-4 p-2">
                        <ProjectList />
                    </div>
                </Route>
                <Route path="/dashboard/projects/:id" children={<ProjectPage />} />
                <Route path="/dashboard/projects/">
                    <Redirect to="/dashboard/projects/projectslist" />
                </Route>
            </Switch>
        </div>
    )
}
