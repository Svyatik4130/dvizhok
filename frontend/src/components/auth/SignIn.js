import React, { useState } from 'react'
import ErrorNotice from '../misc/ErrorNotice'
import SuccessNotice from '../misc/SuccessNotice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loggedUser } from '../../actions/UserActions'
import Loading from '../Loaders/loading'

import { getSignature } from '../helpers/browser-key'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [IsLoading, setIsLoading] = useState(true)
    const signature = getSignature()

    const dispatch = useDispatch()
    const history = useHistory()

    const signIn = async (e) => {
        e.preventDefault()

        try {
            const loginUser = { email, password, signature }
            let token = localStorage.getItem("auth-token")
            if (token === null) {
                localStorage.setItem("auth-token", "")
                token = ""
            }

            const loginRes = await axios.post("users/login", loginUser)

            localStorage.setItem("auth-token", loginRes.data.token)
            await axios.post("/users/tokenIsValid", { signature }, {
                headers: { "x-auth-token": token },
            })

            dispatch(loggedUser({
                token: loginRes.data.token,
                user: loginRes.data.user
            }))
            history.push('/dashboard')
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div>
            {/* ImageLoader */}
            {
                IsLoading ? (
                    <div className="fixed z-40 w-screen h-screen">
                        <Loading />
                    </div>
                ) : (
                    null
                )
            }

            <div className="w-screen flex items-stretch" style={{ height: window.innerHeight - 60 }}>
                <div className="w-full p-4 lg:p-8 rounded md:w-3/12">
                    <div className=" w-full">
                        <img onClick={() => { history.push('/') }} src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/bigLogo.png" alt="Dvizhok" className=" cursor-pointer w-40 mb-16" />
                        <div className="h-full bg-white lg:bg-transparent p-4 rounded-3xl pt-1">
                            <form onSubmit={signIn} className="w-full flex flex-col justify-between h-full " >
                                <div>
                                    <div className="flex items-center my-5 justify-center"><p className="font-semibold pl-2 text-4xl text-black">Ми скучили!</p></div>
                                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                </div>
                                <p className="text-right text-sm text-gray-400">Ще немає аккаунта? <a onClick={() => history.push('/signup')} className="cursor-pointer underline text-purple-850" >Зареєструватися</a></p>
                                <button type="submit" className="px-12 py-2 text-2xl font-bold rounded-lg text-white bg-purple-950 my-6 inline-block"> Вхід</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div onLoad={() => { setIsLoading(false) }} className="w-9/12 md:block hidden bg-cover">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/earth_hands.png" alt="dvizhok_map" className="w-full h-screen block object-cover" />
                </div>
            </div>
        </div>
    )
}
