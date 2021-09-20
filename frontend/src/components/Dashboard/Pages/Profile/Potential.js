import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Popup from 'reactjs-popup';
import ErrorNotice from '../../../misc/ErrorNotice';
import SuccessNotice from '../../../misc/SuccessNotice';

export default function Potential() {
    const [WFPresponse, setWFPresponse] = useState()
    const userData = useSelector(state => state.userData)
    const [error, setError] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [reqLoading, setreqLoading] = useState(false)

    const [amount, setAmount] = useState(0)

    const Pay = async () => {
        try {
            const params = { userId: userData.user.id, amount: 1, email: userData.user.email, phone: userData.user.phoneNumber[0] }
            const resWayForPay = await axios.post("/payments/create-potential-invoice", params)
            setWFPresponse(resWayForPay.data)
            console.log(resWayForPay.data)
            window.open(resWayForPay.data.invoiceUrl, '_blank');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="h-full lg:w-5/7 w-full p-5 pb-10 flex flex-col">
            <div className="text-purple-950">
                <p className="font-semibold mb-4 text-2xl">Ваш Потенціал: {userData.user.balance} грн</p>
                <p className="font-medium text-lg">Ви не можете ефективно впливати на процеси в країні,
                    адже ваш Потенціал для творення змін – {userData.user.balance} гривень. <br />

                    Але ви можете стати замовником змін, підтримуючи саме ті процеси та проекти, які
                    важливі саме для вас.<br />

                    Для цього вам необхідно стати Творцем і почати поповнювати Ваш Потенціал
                    як мінімум на 100 гривень щомісяця.<br />


                    Після цього ви зможете «замовляти музику», обирати і фінансувати важливі для вас
                    проекти на ту суму, яку вважатимете за доцільне.</p>
                {WFPresponse ? (<img src={WFPresponse.qrCode} className=" w-44" alt="qr" />) : (null)}
            </div>
            <div className="mt-4 pb-6 lg:pb-0">
                <Popup
                    trigger={
                        <a className="bg-yellow-350 cursor-pointer font-semibold text-xl text-purple-950 rounded-full px-7 py-3">Стати Творцем</a>
                    }
                    modal
                    nested
                >
                    {close => (
                        <div className="modal bg-white rounded-xl">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="w-full bg-purple-850 px-4 py-2 text-white text-2xl font-bold rounded-t-xl">
                                Вікно зміни аватара
                            </div>

                            <div className="w-10/12 mt-3 m-auto">
                                <div className="px-2 m-auto">
                                    {error && <ErrorNotice message={error} clearError={() => { setError(undefined) }} />}
                                    {successMessage && <SuccessNotice message={successMessage} clearError={() => { setSuccessMessage(undefined) }} />}
                                </div>
                            </div>

                            <p className="font-medium text-lg px-5 mt-4 text-gray-600">Будь ласка, виберіть суму оплати</p>
                            <div className="w-full m-auto flex p-6">
                                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="h-8 mb-3 text-xl px-4 py-5 rounded-lg border-2 border-purple-950 focus:outline-none focus:border-pink-450" step="100" /><br />




                            </div>
                            <div className="w-full rounded-xl bg-gray-50 py-3 px-6 flex items-center flex-col-reverse lg:flex-row-reverse">
                                {reqLoading ? (
                                    <img src="https://dvizhok-hosted-content.s3.us-east-2.amazonaws.com/images/dashboard/help_icons/reload.png" alt="reload" className="animate-spin ml-4 w-9" />
                                ) : (
                                    null
                                )}
                                <button onClick={Pay} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-purple-950 text-yellow-350 text-xl font-semibold hover:bg-purple-850 focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>Поповнити</button>
                                <button
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Закрити
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    )
}
