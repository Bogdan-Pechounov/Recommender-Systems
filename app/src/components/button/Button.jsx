import React from 'react'

import './button.scss'

function Button({ className, onClick, children }) {
  return (
    <button
      className={`btn ${className}`}
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      {children}
    </button>
  )
}

export function OutlineButton({ className, onClick, children }) {
  return (
    <Button className={`btn-outline ${className}`} onClick={onClick}>
      {children}
    </Button>
  )
}

export default Button
