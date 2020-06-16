import React from 'react'
import { AuthContext } from '../AuthContext'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <AuthContext.Consumer>
      {({ user, removeUser }) => (
        <nav className="menu-nav">
          {user ? (
            <>
              <p>Welcome {user.username || user.name}!</p>
              <p onClick={removeUser} className="logout">
                Logout
              </p>
            </>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      )}
    </AuthContext.Consumer>
  )
}
