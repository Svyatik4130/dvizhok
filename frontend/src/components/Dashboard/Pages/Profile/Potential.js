import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Potential() {
    const [WFPresponse, setWFPresponse] = useState()
    const userData = useSelector(state => state.userData)
    const history = useHistory()

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
                <a onClick={Pay} className="bg-yellow-350 cursor-pointer font-semibold text-xl text-purple-950 rounded-full px-7 py-3">Стати Творцем</a>
            </div>
        </div>
    )
}
