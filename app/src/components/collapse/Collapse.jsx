import React from 'react'

import './collapse.scss'

function Collapse({ show, children }) {
  return <div className={`collapse ${show ? 'show' : ''}`}>{children}</div>
}

export default Collapse
