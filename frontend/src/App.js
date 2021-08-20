import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Landing from './components/MainPage/Landing';
import { useDispatch } from 'react-redux'
import { loggedUser } from './actions/UserActions'
import Loader from './components/Loaders/loading';
import Dashboard from './components/Dashboard/Index';
import { addAllProjects } from './actions/ProjectActions'

import FingerprintJS from '@fingerprintjs/fingerprintjs'
import browserSignature from 'browser-signature';
function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const fpPromise = FingerprintJS.load()
  const signature = browserSignature();

  useEffect(() => {
    const PreLoadOpps = async () => {
      try {
        let token = localStorage.getItem("auth-token")
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await axios.post("/users/tokenIsValid", null, {
          headers: { "x-auth-token": token },
        })
        if (tokenRes.data) {
          const userRespond = await axios.get("/users/getme", {
            headers: { "x-auth-token": token },
          });
          dispatch(
            loggedUser({
              token,
              user: userRespond.data,
            })
          )
        }

        const allProjects = await axios.get("/project/get-all-projects")
        dispatch(addAllProjects(allProjects.data))

        const fp = await fpPromise
        const result = await fp.get()

        // This is the visitor identifier:
        const visitorId = result.visitorId
        console.log("Current Browser Unique Signature: ", signature);

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
