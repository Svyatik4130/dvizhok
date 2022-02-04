import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Landing from './components/MainPage/Landing';
import Comix from './components/MainPage/ComixPages/Comix';
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

  useEffect(() => {
    const PreLoadOpps = async () => {
      try {
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
        <Route path="/comix">
          <Comix />
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
