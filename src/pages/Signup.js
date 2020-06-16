import React, { Component } from 'react'
import AuthForm from '../components/AuthForm'
import FormInput from '../components/FormInput'
import { signup } from '../services/auth'

export default class Signup extends Component {
  state = {
    formValues: {
      username: '',
      email: '',
      password: ''
    },
    error: null,
    success: null
  }

  handleInputs = e => {
    const { formValues } = this.state
    const { name, value } = e.target
    formValues[name] = value
    this.setState({ formValues })
  }

  handleSubmit = e => {
    e.preventDefault()
    signup(this.state.formValues)
      .then(response => {
        // here is the user created
        const { userFromDB } = response.data
        console.log(userFromDB)

        this.setState({
          success: 'User created',
          error: null
        })

        this.setState({
          formValues: {
            username: '',
            email: '',
            password: ''
          }
        })

        // we redirect to login
        this.props.history.push('/login')
      })
      .catch(err => {
        const { message } = err.response.data
        this.setState({ error: message })
      })
  }

  render() {
    const { formValues, error, success } = this.state
    return (
      <section>
        <AuthForm title="Signup" submit={this.handleSubmit}>
          <FormInput
            label="Username"
            name="username"
            type="text"
            placeholder="Type your username"
            value={formValues.username}
            onChange={this.handleInputs}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Type your email"
            value={formValues.email}
            onChange={this.handleInputs}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Type your password"
            value={formValues.password}
            onChange={this.handleInputs}
          />
        </AuthForm>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </section>
    )
  }
}
