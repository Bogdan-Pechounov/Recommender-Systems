import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './navbar.scss'
import logo from 'assets/logo.png'

const navItems = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Movies',
    path: '/movies',
  },
  {
    name: 'Search',
    path: '/search',
  },
]

function Navbar() {
  const { pathname } = useLocation()
  const navbarRef = useRef(null)

  useEffect(() => {
    function shrink() {
      if (window.scrollY > 100) {
        navbarRef.current.classList.add('shrink')
      } else {
        navbarRef.current.classList.remove('shrink')
      }
    }
    window.addEventListener('scroll', shrink)
    return () => {
      window.removeEventListener('scroll', shrink)
    }
  }, [])

  return (
    <div ref={navbarRef} className='navbar'>
      <div className='container'>
        <div className='logo'>
          <img src={logo} alt='logo' />
          <Link to='/'>Netflik</Link>
        </div>
        <ul>
          {navItems.map(({ name, path }, i) => (
            <li key={i} className={path === pathname ? 'active' : ''}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
