import React, { useState } from 'react'
import DescNavbar from './Navbars/DescNavbar'
import { Switch, Route } from "react-router-dom";
import Loading from '../Loaders/loading';
import DescTopMenu from './Navbars/DescTopMenu';
import { useSelector } from 'react-redux'

export default function Index() {
    const [IsLoading, setIsLoading] = useState(0)
    const userData = useSelector(state => state.userData)

    return (
        <div>
            {/* ImageLoader. 10 - represents number of menu elements */}
            {IsLoading < 10 ? (
                <div className="fixed z-40 w-screen h-screen">
                    <Loading />
                </div>
            ) : (
                null
            )
            }


            <div onLoad={() => { setIsLoading(IsLoading + 1) }} className="w-1/12">
                <DescNavbar />
            </div>
            <div className="w-11/12">
                {userData.user ? (
                    <DescTopMenu />
                ) : (
                    null
                )
                }
                <Switch>
                    <Route path="/dashboard">
                        <div>hello</div>
                    </Route>
                    <Route path="/dashboard/news">
                        <div>bye</div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
