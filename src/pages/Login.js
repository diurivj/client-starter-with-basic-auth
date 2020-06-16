import React, { Component } from 'react'
import AuthForm from '../components/AuthForm'
import FormInput from '../components/FormInput'
import { AuthContext } from '../AuthContext'
import { login } from '../services/auth'

export default class Login extends Component {
  state = {
    formValues: {
      email: '',
      password: ''
    }
  }

  cleanInputs = () => {
    this.setState({
      formValues: {
        email: '',
        password: ''
      }
    })
  }

  handleInputs = e => {
    const { formValues } = this.state
    const { name, value } = e.target
    formValues[name] = value
    this.setState({ formValues })
  }

  handleSubmit = e => {
    e.preventDefault()

    login(this.state.formValues)
      .then(({ data }) => {
        // we consume the function from the context in order to set the logged user in the context
        this.context.setUser(data.user)

        // we clean the inputs
        this.cleanInputs()

        // we redirect to other the profile page
        this.props.history.push('/profile')
      })
      .catch(({ response }) => {
        // we set the error in context if there's an error
        this.context.setError(response.data.err.message)
      })
  }

  render() {
    const { email, password } = this.state.formValues
    return (
      <AuthContext.Consumer>
        {({ error }) => (
          <section>
            <AuthForm title="Login" submit={this.handleSubmit}>
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Type your email"
                value={email}
                onChange={this.handleInputs}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Type your password"
                value={password}
                onChange={this.handleInputs}
              />
            </AuthForm>
            {error && <p className="error-message">{error}</p>}
          </section>
        )}
      </AuthContext.Consumer>
    )
  }
}

// VERY IMPORTANT!!!!!
// this line help us to get the context in this.context
Login.contextType = AuthContext
