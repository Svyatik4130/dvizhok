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

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // console.log(token)
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
      setIsLoading(false)
    }
    checkLoggedIn()
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
