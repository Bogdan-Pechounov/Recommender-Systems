import React from 'react'
import ReactDOM from 'react-dom'
import { ModalContext } from './ModalContext'

import './modal.scss'

const Modal = () => {
  let { active, content, toggle } = React.useContext(ModalContext)
  return ReactDOM.createPortal(
    <div className={`modal ${active ? 'active' : ''}`} onClick={toggle}>
      <div className='content' onClick={(e) => e.stopPropagation()}>
        {content}
        <div className='close' onClick={toggle}>
          <i className='bx bx-x'></i>
        </div>
      </div>
    </div>,
    document.querySelector('#modal-root')
  )
}

export default Modal
