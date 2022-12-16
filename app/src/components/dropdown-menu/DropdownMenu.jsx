import Button from 'components/button/Button'
import React, { useState } from 'react'

import './dropdown-menu.scss'

function DropdownMenu({ selected, setSelected, items, title = 'Sort by' }) {
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open)
  }

  function select(item) {
    setSelected(item)
    toggle()
  }
  return (
    <div className='dropdown'>
      <button className='selector' onClick={toggle}>
        {title} <i className='bx bx-chevron-down'></i>
      </button>
      <nav className={`menu ${open ? 'open' : ''}`}>
        <ul>
          {items.map((item, i) => (
            <li key={i} className='item' onClick={() => select(item)}>
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default DropdownMenu
