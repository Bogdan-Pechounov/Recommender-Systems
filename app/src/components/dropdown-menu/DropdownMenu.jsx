import Button from 'components/button/Button'
import React, { useEffect, useRef, useState } from 'react'

import './dropdown-menu.scss'

function DropdownMenu({
  selected,
  setSelected,
  items,
  title = 'Sort by',
  displayNames,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  //close when click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  function toggle() {
    setOpen((open) => !open)
  }

  function select(item) {
    setSelected(item)
    toggle()
  }

  return (
    <div ref={ref} className='dropdown'>
      <button className='selector' onClick={toggle}>
        {title} <i className='bx bx-chevron-down'></i>
      </button>
      <nav className={`menu ${open ? 'open' : ''}`}>
        <ul>
          {items.map((item, i) => (
            <li key={i} className='item' onClick={() => select(item)}>
              {displayNames ? displayNames[item] : item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default DropdownMenu
