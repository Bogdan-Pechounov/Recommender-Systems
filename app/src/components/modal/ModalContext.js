import React from 'react'
import Modal from './Modal'
import useModal from './useModal'

let ModalContext = React.createContext()

let ModalProvider = ({ children }) => {
  let modal = useModal()
  return (
    <ModalContext.Provider value={modal}>
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
