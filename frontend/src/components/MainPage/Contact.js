import React, { useState } from 'react'
import axios from 'axios'
import ErrorNotice from '../misc/ErrorNotice'
import SuccessNotice from '../misc/SuccessNotice'

export default function Contact() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()

    const submitEmail = async (e) => {
        e.preventDefault()
        setError(undefined)
        try {
            const layout = { name, phone, email, message }
            const emailsend_response = await axios.post("landing/sendemail", layout)

            setName("")
            setPhone("")
            setEmail("")
            setMessage("")

            if(emailsend_response.data){
                setSuccessMessage("Your message have been sent")
            }

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div className="lg:w-10/12 w-11/12 flex lg:flex-row flex-col m-auto">
            <div className="lg:w-6/12 w-full flex-1 lg:pr-2">
                <div className="bg-white rounded-3xl pt-5">
                    <p className="text-center text-purple-950 font-bold text-3xl">Контакти</p>
                    <div className="flex text-center m-auto items-center mt-5 justify-center"><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/gps.png" alt="ok_logo_mini" className="h-9" /><p className="font-medium text-center pl-2 text-lg">Україна, Київ, вул. Предславинська</p></div>
                    <div className="flex m-auto items-center mt-3 justify-center"><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/landing/phone.png" alt="ok_logo_mini" className="h-9" /><p className="font-medium text-center pl-2 text-lg">+38 (092) 000 00 00</p></div>
                    <div className="w-full pt-4 h-124 rounded-b-3xl">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.0956030047937!2d30.521662415730326!3d50.420690379471246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf178d9b9fb1%3A0x3be933d9d0bc7fb4!2z0YPQuy4g0J_RgNC10LTRgdC70LDQstC40L3RgdC60LDRjywgMzksINCa0LjQtdCyLCAwMjAwMA!5e0!3m2!1sru!2sua!4v1626626386177!5m2!1sru!2sua" allowfullscreen="" loading="lazy" className="border-0 w-full h-full"></iframe>
                    </div>
                </div>
            </div>
            <div className="lg:w-6/12 lg:pt-0 pt-4 w-full flex-1 lg:pl-2">
                <div className="bg-white h-full rounded-3xl pt-1">
                    <form onSubmit={submitEmail} className="w-full flex flex-col justify-between h-full px-3 lg:px-16 " >
                        <div>
                            <div className="flex items-center my-5 justify-center"><p className="font-bold pl-2 text-3xl text-purple-950">Зворотній зв’яз</p><img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/mini_logo.png" alt="ok_logo_mini" className="h-8" /></div>
                            {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                            {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Ім’я" className="w-full mt-4 mb-3 h-8 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" name='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Телефон" className="w-full mb-3 h-8 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" className="w-full h-8 mb-3 text-xl px-4 py-5 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                            <textarea value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder="Повідомлення" className="w-full resize-none h-36 text-xl px-4 py-3 rounded-2xl border-2 border-purple-950 focus:outline-none focus:border-pink-450" />
                        </div>
                        <button type="submit" className="px-12 py-2 text-2xl font-bold text-center rounded-2xl text-white bg-purple-950 my-6 m-auto"> Надіслати</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
