import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AuthProvider from './AuthContext'
import PrivateRoute from './components/PrivatePage'
import Profile from './pages/Profile'

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
)

export default Router
