import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { loggedUser } from '../../../../actions/UserActions'
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'
import { getSignature } from '../../../helpers/browser-key'

export default function Change_Pass() {
    const userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const [btnColor, setBtnColor] = useState("bg-gray-700 cursor-default")

    const [curPass, setCurPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [repeateNewPass, setRepeateNewPass] = useState('')

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const signature = getSignature()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userID = userData.user.id
            const payload = { curPass, newPass, repeateNewPass, userID, signature }
            let token = localStorage.getItem("auth-token")
            const changePassRes = await axios.post("/users/pass_change", payload, { headers: { "x-auth-token": token, "secret": signature }, })
            console.log(changePassRes)
            dispatch(loggedUser({
                token: changePassRes.data.token,
                user: changePassRes.data.user
            }))
            localStorage.setItem("auth-token", changePassRes.data.token)
            if (changePassRes.status == 200) {
                setError(undefined)
                setSuccessMessage("Зміни були успішно внесені")
            }
        } catch (err) {
            console.log(err.response.data.msg)
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    useEffect(() => {
        if (curPass !== "" && newPass !== "" && repeateNewPass !== "") {
            setBtnColor("bg-purple-950 cursor-pointer")
        } else {
            setBtnColor("bg-gray-700 cursor-default")
        }
    }, [curPass, newPass, repeateNewPass])

    return (
        <div>
            <div className="w-10/12 lg:mt-3">
                <div className="px-14">
                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex p-5">
                    <div className="lg:w-5/12 w-full lg:px-7 px-2">
                        <div>
                            <p className=" font-semibold text-lg">Поточний пароль</p>
                            <input value={curPass} onChange={e => setCurPass(e.target.value)} type="password" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Новий пароль</p>
                            <input value={newPass} onChange={e => setNewPass(e.target.value)} type="password" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Підтвердження нового паролю</p>
                            <input value={repeateNewPass} onChange={e => setRepeateNewPass(e.target.value)} type="password" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <button type="submit" className={`font-meduim text-lg px-6 py-2 ${btnColor} text-white rounded-xl`}>Зберегти зміни</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
