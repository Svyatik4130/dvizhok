import React from 'react'
import { Switch, Route } from "react-router-dom";
import Navbar from '../Navbar';
import ProjectPageForGuest from './ProjectPageForGuest';
import ProjectsForGuests from './ProjectsForGuests';

export default function GuestPages() {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route path="/guest/projects/:id" children={<ProjectPageForGuest />} />
                <Route path="/guest/projects/">
                    <ProjectsForGuests />
                </Route>
            </Switch>
        </div>
    )
}
