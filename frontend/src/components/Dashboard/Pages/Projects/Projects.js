import React from 'react'
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import CreateProject from './CreateProject'
import MyProjects from './MyProjects';
import ProjectList from './ProjectList';
import ProjectPage from './ProjectPage';

export default function Projects() {
    return (
        <div className="lg:px-6 px-2 lg:pt-4 pt-0">
            <Switch>
                <Route path="/dashboard/projects/createproject">
                    <div style={{ height: window.innerHeight - 100 }} className="w-full overflow-y-scroll rounded-xl p-4 bg-white">
                        <CreateProject />
                    </div>
                </Route>
                <Route path="/dashboard/projects/myprojects">
                    <div className="flex flex-wrap lg:ml-6 ml-0 mt-3 gap-2">
                        <NavLink activeClassName="text-yellow-350" className="bg-purple-950 rounded-2xl px-6 text-white font-medium text-lg py-2" to="/dashboard/projects/myprojects">
                            Мої проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350" className="bg-purple-950 rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/projectslist">
                            Всі проекти
                        </NavLink>
                        <NavLink className="bg-yellow-350 rounded-2xl text-purple-950 px-6 font-medium text-lg py-2" to="/dashboard/projects/createproject">
                            + Створити проект
                        </NavLink>
                    </div>
                    <div style={{ height: window.innerHeight - 160 }} className="w-full overflow-y-scroll rounded-xl p-4">
                        <MyProjects />
                    </div>
                </Route>
                <Route path="/dashboard/projects/projectslist">
                    {/* project menu */}
                    <div className="flex flex-wrap lg:ml-6 ml-0 mt-3 gap-2">
                        <NavLink activeClassName="text-yellow-350" className="bg-purple-950 rounded-2xl px-6 text-white font-medium text-lg py-2" to="/dashboard/projects/myprojects">
                            Мої проекти
                        </NavLink>
                        <NavLink activeClassName="text-yellow-350" className="bg-purple-950 rounded-2xl text-white px-6 font-medium text-lg py-2" to="/dashboard/projects/projectslist">
                            Всі проекти
                        </NavLink>
                        <NavLink className="bg-yellow-350 rounded-2xl text-purple-950 px-6 font-medium text-lg py-2" to="/dashboard/projects/createproject">
                            + Створити проект
                        </NavLink>
                    </div>
                    <div style={{ height: window.innerHeight - 160 }} className="w-full overflow-y-scroll rounded-xl lg:p-4 p-2">
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
