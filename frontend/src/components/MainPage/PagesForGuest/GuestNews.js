import React, { useEffect, useState } from 'react'
import NewsPage from '../../Dashboard/Pages/News/NewsPage';
import { Switch, Route } from "react-router-dom";
import axios from 'axios';
import SimpleLoader from '../../Loaders/SimpleLoader';

export default function GuestNews() {
    const [allNews, setallNews] = useState()
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const preloadOpps = async () => {
            const res = await axios.get("/story/get-all-stories")
            setallNews(res.data)

            setisLoading(false)
        }
        preloadOpps()
    }, [])

    if (isLoading) {
        return (
            <SimpleLoader />
        )
    } else {
        return (
            <div className='lg:pt-16 pt-4'>
                <div className='lg:w-4/5 overflow-y-scroll flex lg:p-10 px-4 pt-20 flex-col lg:pr-8 w-full'>

                    <Switch>
                        <Route path="/guest/news/:id" children={<NewsPage allNews={allNews} />} />
                    </Switch>
                </div>

            </div>
        )
    }
}
