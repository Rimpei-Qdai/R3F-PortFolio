import React, { useState } from 'react'
import Works from './Works'
import Labo from './Labo'
import { useLocation } from 'react-router-dom'
import Hobby from './Hobby'
import Philosophy from './Philosophy'
import SNS from './SNS'
import Header from './Header'

const ContentManager = () => {

  const [content, setContent] = useState(useLocation().hash.slice(1))
  window.addEventListener('hashchange', (event) => {
    setContent(event.srcElement.location.hash.slice(1))
  })
  return (
    <>
     <Header />
    {
      content == "works" ? (
        <Works />
      ) : content == "labo" ? (
        <Labo />
      ) : content =="hobby" ? (
        <Hobby />
      ) : content == "philosophy" ? (
        <Philosophy />
      ) : content == "sns" ? (
        <SNS />
      ) : (
        <></>
      )
    }
    </>
  )
}

export default ContentManager