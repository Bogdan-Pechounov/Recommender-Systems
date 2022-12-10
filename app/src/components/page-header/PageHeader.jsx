import React from 'react'

import './page-header.scss'

import bg from 'assets/footer-bg.jpg'

function PageHeader({ title }) {
  return (
    <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
      <h1>{title}</h1>
    </div>
  )
}

export default PageHeader
