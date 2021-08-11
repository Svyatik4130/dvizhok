import React, { useState } from 'react'
import ErrorNotice from '../misc/ErrorNotice'
import SuccessNotice from '../misc/SuccessNotice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loggedUser } from '../../actions/UserActions'
import Loading from '../Loaders/loading'

export default function SignIn() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [passwordCheck, setPasswordCheck] = useState()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [IsLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()
    const history = useHistory()

    const signUp = async (e) => {
        e.preventDefault()
        try {
            const newUser = { name, phone, email, password, passwordCheck }
            await axios.post("/users/register", newUser)
            const loginRes = await axios.post("users/login", { email, password })
            dispatch(loggedUser({
                token: loginRes.data.token,
                user: loginRes.data.user
            }))

            localStorage.setItem("auth-token", loginRes.data.token)
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
                <div className="w-full p-4 lg:p-8 rounded md:w-3/12 overflow-y-auto">
                    <div className=" w-full">
                        <img onClick={() => { history.push('/') }} src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/bigLogo.png" alt="Dvizhok" className=" cursor-pointer w-40 mb-16" />
                        <div className="h-full bg-white lg:bg-transparent p-4 rounded-3xl pt-1">
                            <form onSubmit={signUp} className="w-full flex flex-col justify-between h-full " >
                                <div>
                                    <div className="flex items-center mt-5 justify-center"><p className="font-bold pl-2 text-4xl text-black">Привіт!</p></div>
                                    <div className="flex items-center mb-5 justify-center"><p className="font-bold text-center pl-2 text-xl text-gray-400">Створи аккаунт в мережі Dvizhok</p></div>
                                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                    <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Ім’я" className="w-full mt-4 mb-3 h-8 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                    <input value={phone} onChange={e => setPhone(e.target.value)} type="phone" placeholder="Телефон" className="w-full mb-3 h-8 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                    <div><input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" /></div>
                                    <div>
                                        <input autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" className="w-full h-8 mb-0.5 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                        <input autoComplete="new-password" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)} type="password" placeholder="password repeate" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                    </div>
                                </div>
                                <p className="text-right text-sm text-gray-400">Вже є аккаунт? <a onClick={() => history.push('/signin')} className="cursor-pointer underline text-purple-850" >Увійти</a></p>

                                <button type="submit" className="px-12 py-2 text-2xl font-bold text-center rounded-lg text-white bg-purple-950 my-6 m-auto">Register</button>
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
