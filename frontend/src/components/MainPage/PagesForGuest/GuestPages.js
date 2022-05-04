import React, { useEffect } from 'react'
import { Switch, Route } from "react-router-dom";
import Navbar from '../Navbar';
import GuestNews from './GuestNews';
import ProjectPageForGuest from './ProjectPageForGuest';
import ProjectsForGuests from './ProjectsForGuests';

export default function GuestPages() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <Navbar />
            <Switch>
                <Route path="/guest/projects/:id" children={<ProjectPageForGuest />} />
                <Route path="/guest/news/:id" children={<GuestNews />} />
                <Route path="/guest/projects/">
                    <ProjectsForGuests />
                </Route>
            </Switch>
        </div>
    )
}
