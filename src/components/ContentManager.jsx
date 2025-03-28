import React, { useState } from 'react'
import Works from './Works'
import Labo from './Labo'
import { useLocation } from 'react-router-dom'
import Hobby from './Hobby'

const ContentManager = () => {

  const [content, setContent] = useState(useLocation().hash.slice(1))
  window.addEventListener('hashchange', (event) => {
    setContent(event.srcElement.location.hash.slice(1))
  })
  return (
    <>
    {
      content == "works" ? (
        <Works />
      ) : content == "labo" ? (
        <Labo />
      ) : content =="hobby" ? (
        <Hobby />
      ) : (
        <></>
      )
    }
    </>
  )
}

export default ContentManager