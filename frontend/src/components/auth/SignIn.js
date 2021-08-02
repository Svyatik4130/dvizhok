import React, { useState } from 'react'
import ErrorNotice from '../misc/ErrorNotice'
import SuccessNotice from '../misc/SuccessNotice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loggedUser } from '../../actions/UserActions'


export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const dispatch = useDispatch()
    const history = useHistory()

    const signIn = async (e) => {
        e.preventDefault()

        try {
            const loginUser = { email, password }

            const loginRes = await axios.post("users/login", loginUser)
            dispatch(loggedUser({
                token: loginRes.data.token,
                user: loginRes.data.user
            }))
            localStorage.setItem("auth-token", loginRes.data.token)

            history.push('/')
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div className="w-screen flex items-stretch" style={{ height: window.innerHeight - 60 }}>
            <div className="w-10/12 m-auto p-8 rounded md:w-6/12">
                <div className="pt-4 w-full flex-1">
                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/bigLogo.png" alt="Dvizhok" className=" m-auto w-72 mb-24" />
                    <div className="bg-white h-full rounded-3xl pt-1">
                        <form onSubmit={signIn} className="w-full flex flex-col justify-between h-full px-3 lg:px-16 " >
                            <div>
                                <a onClick={() => history.push('/')} className="text-lg cursor-pointer font-medium text-purple-950">❮Назад на головну сторінку</a>
                                <div className="flex items-center my-5 justify-center"><p className="font-semibold pl-2 text-3xl text-black">Login</p></div>
                                {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            </div>
                            <p className="text-right text-sm text-gray-400">Ще немає аккаунта? <a onClick={() => history.push('/signup')} className="cursor-pointer underline text-purple-850" >Зареєструватися</a></p>
                            <button type="submit" className="px-12 py-2 text-2xl font-bold text-center rounded-2xl text-white bg-purple-950 my-6 m-auto"> Вхід</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
