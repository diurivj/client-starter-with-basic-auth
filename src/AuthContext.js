import React, { Component, createContext } from 'react'
import { logout, getUser } from './services/auth'

export const AuthContext = createContext()

export default class AuthProvider extends Component {
  state = {
    user: null,
    error: null,
    loading: true
  }

  componentDidMount() {
    // check if there's a user already logged in
    getUser()
      .then(({ data }) => {
        if (data.message === 'Unauthorized access!') {
          this.setState({ user: null })
        } else {
          this.setState({ user: data.user })
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
  }

  // save the logged user in the context in order to persist it.
  setUser = user => {
    this.setState({ user })
  }

  // set error in context, in order to get global access.
  setError = error => {
    this.setState({ error })
  }

  // remove the logged user from context.
  removeUser = async () => {
    await logout()
    this.setState({ user: null, error: null })
  }

  render() {
    const { setUser, removeUser, setError, state } = this

    return (
      <AuthContext.Provider value={{ ...state, setError, setUser, removeUser }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
