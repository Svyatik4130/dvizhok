import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { loggedUser } from '../../../../actions/UserActions'
import ErrorNotice from '../../../misc/ErrorNotice'
import SuccessNotice from '../../../misc/SuccessNotice'
import { getSignature } from '../../../helpers/browser-key'
// import InputMask from 'react-input-mask';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import SimpleLoader from '../../../Loaders/SimpleLoader'

export default function Personal_Info() {
    const userData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    const [btnColor, setBtnColor] = useState("bg-gray-700 cursor-default")
    const [btnType, setBtnType] = useState("button")

    const [name, setName] = useState(userData.user.name)
    const [surname, setSurname] = useState(userData.user.surname)
    const [country, setCountry] = useState(userData.user.country)
    const [birthDate, setbirthDate] = useState(userData.user.birthDate)
    const [occupation, setOccupation] = useState(userData.user.occupationTown)
    const [phoneNumbers, setPhoneNumbers] = useState(userData.user.phoneNumber[0])
    const [email, setEmail] = useState(userData.user.email)

    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const signature = getSignature()

    const [expanded, setExpanded] = useState(false);
    const [selections, setSelections] = useState(userData.user.sex);
    const PLATFORMS = ["Чоловік", "Жінка"];

    const toggleExpanded = () => {
        if (!expanded) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    };

    const handleChange = event => {
        if (event.target.checked) {
            return setSelections([event.target.name]);
        }
        const filtered = selections.filter(name => name !== event.target.name);
        return setSelections(filtered);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const dateNow = new Date()
            const dateOfBirth = new Date(birthDate)
            if (dateOfBirth.getTime() >= dateNow.getTime()) {
                setError("Будь ласка, введіть правильну дату вашого народження");
                return
            }
            if (!isValidPhoneNumber(phoneNumbers)) {
                setError("Будь ласка, введіть дійсний номер телефону");
                return
            }

            if (name !== userData.user.name || email !== userData.user.email || surname !== userData.user.surname || country !== userData.user.country || birthDate !== userData.user.birthDate || occupation !== userData.user.occupationTown || phoneNumbers !== userData.user.phoneNumber[0] || selections !== userData.user.sex) {
                const userID = userData.user.id
                const payload = { name, email, surname, country, birthDate, occupation, phoneNumber: [phoneNumbers], sex: selections, userID, signature }
                let token = localStorage.getItem("auth-token")
                const changeRes = await axios.post("/users/info_change", payload, { headers: { "x-auth-token": token, "secret": signature }, })
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
                    setExpanded(false)
                }
            }
        } catch (err) {
            console.log(err.response.data.msg)
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    useEffect(() => {
        if (name !== userData.user.name || email !== userData.user.email || surname !== userData.user.surname || country !== userData.user.country || birthDate !== userData.user.birthDate || occupation !== userData.user.occupationTown || phoneNumbers !== userData.user.phoneNumber[0] || selections !== userData.user.sex) {
            setBtnColor("bg-purple-950 cursor-pointer")
            setBtnType("submit")
        } else {
            setBtnColor("bg-gray-700 cursor-default")
            setBtnType("button")
        }
    }, [name, email, surname, country, birthDate, occupation, phoneNumbers, selections])

    return (
        <div>
            <div className="w-10/12 lg:mt-3">
                <div className="px-14">
                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row p-5">
                    <div className="lg:w-5/12 w-full lg:px-7 px-2">
                        <div>
                            <p className=" font-semibold text-lg">Iм’я</p>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder={userData.user.name} className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Прізвище</p>
                            <input value={surname} onChange={e => setSurname(e.target.value)} placeholder={userData.user.surname} type="text" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Дата народження</p>
                            <input value={birthDate} onChange={e => setbirthDate(e.target.value)} type="date" placeholder={userData.user.birthDate} className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Стать</p>
                            <div className="relative">
                                <div onClick={toggleExpanded}>
                                    <div className={`font-semibold border-2 border-purple-950 rounded-xl px-2 py-1 cursor-pointer ${expanded ? "up-arrow" : "down-arrow"}`}>
                                        {selections[0] !== ""
                                            ? selections.map((name, i) => (
                                                <span key={i}>
                                                    {i ? ", " : null}
                                                    {name}
                                                </span>
                                            ))
                                            : "Стать"}
                                    </div>
                                </div>
                                {expanded && (
                                    <div className="border-gray-200 absolute z-40 bg-gray-100 w-full rounded-xl pr-4 border border-solid">
                                        {PLATFORMS.map(platform => (
                                            <label htmlFor="one" className="block" key={platform}>
                                                <input
                                                    type="radio"
                                                    checked={selections.includes(platform)}
                                                    name={platform}
                                                    value={platform}
                                                    onChange={handleChange}
                                                    className="m-3 h-4 w-4 cursor-pointer"
                                                />
                                                {platform}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-5/12 w-full lg:px-7 px-2">
                        <div>
                            <p className=" font-semibold text-lg">Країна</p>
                            <input value={country} onChange={e => setCountry(e.target.value)} placeholder={userData.user.country} type="text" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Місто проживання</p>
                            <input value={occupation} onChange={e => setOccupation(e.target.value)} placeholder={userData.user.occupation} type="text" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">E-mail</p>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder={userData.user.email} className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <div>
                            <p className=" font-semibold text-lg">Мобільний телефон</p>
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                value={phoneNumbers}
                                defaultCountry="UA"
                                onChange={setPhoneNumbers} />
                        </div>
                        <button type={btnType} className={`font-meduim mt-4 transition-all text-lg px-6 py-2 ${btnColor} text-white rounded-xl`}>Зберегти зміни</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
