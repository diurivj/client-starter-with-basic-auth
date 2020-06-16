import React from 'react'

export default function AuthForm(props) {
  const { title, submit } = props
  return (
    <>
      <h1>{title}</h1>
      <form className="auth-form" onSubmit={submit}>
        {props.children}
        <input type="submit" value={title} />
      </form>
    </>
  )
}
