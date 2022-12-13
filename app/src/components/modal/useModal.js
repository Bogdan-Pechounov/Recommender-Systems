import React from 'react'

function useModal() {
  let [active, setActive] = React.useState(false)
  let [content, setContent] = React.useState()

  function toggle() {
    setActive(!active)
    setContent('')
  }

  return { active, content, setContent, toggle }
}

export default useModal
