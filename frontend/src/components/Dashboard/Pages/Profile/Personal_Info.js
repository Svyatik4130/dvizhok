import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { loggedUser } from '../../../../actions/UserActions'
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'

export default function Personal_Info() {
    const userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const [btnColor, setBtnColor] = useState("bg-gray-700 cursor-default")

    const [name, setName] = useState(userData.user.name)
    const [surname, setSurname] = useState("")
    const [country, setCountry] = useState("")
    const [email, setEmail] = useState(userData.user.email)

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (name !== userData.user.name || email !== userData.user.email) {
                const userID = userData.user.id
                const payload = { name, email, userID }
                let token = localStorage.getItem("auth-token")
                const changeRes = await axios.post("/users/info_change", payload, { headers: { "x-auth-token": token }, })
                console.log(changeRes)
                dispatch(loggedUser({
                    token: changeRes.data.token,
                    user: changeRes.data.user
                }))
                localStorage.setItem("auth-token", changeRes.data.token)
                if (changeRes.status == 200) {
                    setError(undefined)
                    setSuccessMessage("Зміни були успішно внесені")
                    setBtnColor("bg-gray-700 cursor-default")
                }
            }
        } catch (err) {
            console.log(err.response.data.msg)
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    useEffect(() => {
        if (name !== userData.user.name || email !== userData.user.email) {
            setBtnColor("bg-purple-950 cursor-pointer")
        } else {
            setBtnColor("bg-gray-700 cursor-default")
        }
    }, [name, email])

    return (
        <div>
            <div className="w-10/12 mt-3">
                <div className="px-14">
                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex p-5">
                    <div className="w-5/12 px-7">
                        <div>
                            <p className=" font-semibold text-lg">Iм’я</p>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder={userData.user.name} className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Прізвище</p>
                            <input value={surname} onChange={e => setSurname(e.target.value)} type="text" placeholder="surname" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                    </div>
                    <div className="w-5/12 px-7">
                        <div>
                            <p className=" font-semibold text-lg">Країна</p>
                            <input value={country} onChange={e => setCountry(e.target.value)} type="text" placeholder="country" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">E-mail</p>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder={userData.user.email} className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <button type="submit" className={`font-meduim transition-all text-lg px-6 py-2 ${btnColor} text-white rounded-xl`}>Зберегти зміни</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
