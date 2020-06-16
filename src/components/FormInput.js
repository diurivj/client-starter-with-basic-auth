import React from 'react'

export default function FormInput({ label, name, type, value, onChange, placeholder }) {
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <input onChange={onChange} id={name} type={type} name={name} placeholder={placeholder} value={value} />
    </div>
  )
}
