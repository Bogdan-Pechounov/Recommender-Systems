import React from 'react'

import bg from 'assets/footer-bg.jpg'
import logo from 'assets/logo.png'
import { Link } from 'react-router-dom'
import './footer.scss'

function Footer() {
  return (
    <footer style={{ backgroundImage: `url(${bg})` }}>
      <div className='content'>
        <div className='container'>
          <div className='logo'>
            <img src={logo} alt='Netflik' />
            <Link to='/'>Netflik</Link>
          </div>
        </div>
        <div className='menus'>
          <div className='menu'>
            <Link to='/'>Home</Link>
            <Link to='/'>Contact us</Link>
            <Link to='/'>Terms of services</Link>
            <Link to='/'>About us</Link>
          </div>
          <div className='menu'>
            <Link to='/'>FAQ</Link>
            <Link to='/'>Forums</Link>
            <Link to='/'>News</Link>
            <Link to='/'>Privacy policy</Link>
          </div>
          <div className='menu'>
            <Link to='/'>Must watch</Link>
            <Link to='/'>Recent releases</Link>
            <Link to='/'>Classics</Link>
            <Link to='/'>Top IMBD</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
