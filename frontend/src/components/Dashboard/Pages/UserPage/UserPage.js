import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SimpleLoader from '../../../Loaders/SimpleLoader';

export default function UserPage() {
    let { id } = useParams()
    const [UserInfo, setUserInfo] = useState()
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const receivingExactUser = async () => {
            try {
                const userInfoReq = await axios.post("/users/get-user", { id })
                setUserInfo(userInfoReq.data)

                setisLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        receivingExactUser()
    }, [])

    if (isLoading) {
        return (
            <div className="h-screen">
                <SimpleLoader />
            </div>
        )
    }

    return (
        <div className="w-full flex">
            <div className="w-6/12">
                {UserInfo.name}
            </div>
            <div className="w-6/12"></div>
        </div>
    )
}
