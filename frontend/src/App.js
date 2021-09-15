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
        const str = '{"merchantAccount":"freelance_user_6138863bab744","orderReference":"1631653332","merchantSignature":"5e7221b6acc4056d5d3a3001d8c0af4b","amount":1,"currency":"UAH","authCode":"31224Z","email":null,"phone":null,"createdDate":1631653334,"processingDate":1631654433,"cardPan":"","cardType":null,"issuerBankCountry":null,"issuerBankName":null,"recToken":"","transactionStatus":"Refunded","reason":"Ok","reasonCode":1100,"fee":0,"paymentSystem":"googlePay","acquirerBankName":"WayForPay","cardProduct":"debit","clientName":null,"products":{"name":"\u041f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0440","price":1,"count":1}}'
        console.log(JSON.parse(str))

        // const firstKey = Object.keys(req.body)[0];
        // const firstProduct = Object.keys(req.body.firstKey)[0];

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
