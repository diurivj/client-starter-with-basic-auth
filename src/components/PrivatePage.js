import React from 'react'
import { AuthContext } from '../AuthContext'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {({ user, loading }) => (
        <Route
          {...rest}
          render={props =>
            !loading ? (
              user ? (
                <Component {...props} user={user} />
              ) : (
                <Redirect to="/login" />
              )
            ) : (
              <section>
                <p>Loading...</p>
              </section>
            )
          }
        />
      )}
    </AuthContext.Consumer>
  )
}

export default PrivateRoute
