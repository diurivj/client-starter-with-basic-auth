import React, { Component, createContext } from 'react'
import { logout, getUser } from './services/auth'

export const AuthContext = createContext()

export default class AuthProvider extends Component {
  state = {
    user: null,
    error: null,
    loading: true,
    token: null
  }

  componentDidMount() {
    // check if there's a user already logged in
    const token = localStorage.getItem('token')

    if (token) {
      getUser(token)
        .then(({ data }) => {
          if (data.message === 'Unauthorized access!') {
            this.setState({ user: null })
          } else {
            this.setState({ user: data.user, token })
          }
        })
        .catch(({ response }) => {
          // here is the error from the server
          // console.log(response.data)
          this.setState({ user: null, error: null })
        })
        .finally(() => {
          this.setState({ loading: false, error: null })
        })
    } else {
      this.setState({ user: null, error: null, loading: false, token: null })
    }
  }

  // save the logged user in the context in order to persist it.
  setUser = user => {
    this.setState({ user })
  }

  // set error in context, in order to get global access.
  setError = error => {
    this.setState({ error })
  }

  setToken = token => {
    this.setState({ token })
  }

  // remove the logged user from context.
  removeUser = async () => {
    await logout()
    this.setState({ user: null, error: null })
  }

  render() {
    const { setUser, removeUser, setError, setToken, state } = this

    return (
      <AuthContext.Provider value={{ ...state, setError, setUser, setToken, removeUser }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
