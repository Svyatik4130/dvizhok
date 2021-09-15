import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Landing from './components/MainPage/Landing';
import { useDispatch } from 'react-redux'
import { loggedUser } from './actions/UserActions'
import Loader from './components/Loaders/loading';
import Dashboard from './components/Dashboard/Index';
import { addAllProjects } from './actions/ProjectActions'

import { getSignature } from './components/helpers/browser-key'
import GuestPages from './components/MainPage/PagesForGuest/GuestPages';

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const signature = getSignature()
  const history = useHistory()

  useEffect(() => {
    const PreLoadOpps = async () => {
      try {
        const str = '{ "merchantAccount": "freelance_user_6138863bab744", "orderReference": "1631696334", "merchantSignature": "a1d51066edcdfbc93ab82b00822024f9", "amount": 1, "currency": "UAH", "authCode": "", "email": "appletrollface@gmail.com", "phone": "380556667788", "createdDate": 1631696336, "processingDate": 1631697252, "cardPan": "", "cardType": null, "issuerBankCountry": null, "issuerBankName": null, "recToken": "", "transactionStatus": "Declined", "reason": "Cardholder session expired", "reasonCode": 1124, "fee": 0, "paymentSystem": "card", "acquirerBankName": "WayForPay", "clientName": null, "repayUrl": "https:\/\/secure.wayforpay.com\/repay\/e0421c22cee9315dad124dfb7ed00874", "products": { "name": "\u041f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0440", "price": 1, "count": 1 }}'
        console.log(JSON.parse(str))


        let token = localStorage.getItem("auth-token")
        if (token === null) {
          localStorage.setItem("auth-token", "")
          token = ""
        }

        const tokenRes = await axios.post("/users/tokenIsValid", { signature }, {
          headers: { "x-auth-token": token },
        })
        if (tokenRes.data) {
          const userRespond = await axios.get("/users/getme", {
            headers: { "x-auth-token": token, "secret": signature },
          });
          dispatch(
            loggedUser({
              token,
              user: userRespond.data,
            })
          )
        } else {
          localStorage.setItem("auth-token", "")
          token = ""
        }

        const allProjects = await axios.get("/project/get-all-projects")
        dispatch(addAllProjects(allProjects.data))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    PreLoadOpps()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/guest">
          <GuestPages />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
