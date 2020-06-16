import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    // we can access the user from props because of our custom private page component
    const { user } = this.props
    return <section>Hi {user.username}</section>
  }
}
