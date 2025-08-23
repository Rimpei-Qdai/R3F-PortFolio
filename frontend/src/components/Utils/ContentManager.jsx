import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import origin from '../../origin.js'
import Header from '../Partials/Header.jsx'
import Now from '../Pages/Now.jsx'
import Works from '../Pages/Works.jsx'
import Labo from '../Pages/Labo.jsx'
import Hobby from '../Pages/Hobby.jsx'
import Philosophy from '../Pages/Philosophy.jsx'
import SNS from '../Pages/SNS.jsx'
import Intro from '../Pages/Intro.jsx'
import News from '../Pages/News.jsx'  

const ContentManager = () => {
  const [content, setContent] = useState(useLocation().hash.slice(1))
  const [ news, setNews ] = useState(false)

  useEffect(() => {
    window.addEventListener('hashchange', (event) => {
      setContent(event.srcElement.location.hash.slice(1))
    })

    fetch(`${ origin }/api/news`).then(res => res.json()).then((data) => {
      setNews(data.news)
    })
  }, [ ])


  useEffect(() => {
    if(content != "") {
      const parent = document.querySelector(`#twoD-content`)
      const backButton = document.querySelector('.back-button')
      if(parent) {
        const rect = parent.getBoundingClientRect()
        if(parent.classList.contains("right")) {
          backButton.style.top = `${rect.top + window.innerHeight * 0.03}px`
          backButton.style.right = `${ rect.width * 0.03 }px`
        } else if(parent.classList.contains("down")) {
          backButton.style.position = "absolute"
        } else {
          backButton.style.top = `${rect.top + window.innerHeight * 0.03}px`
          backButton.style.left = `${ rect.width * 0.8}px`
        }
      }

  
    }
  }, [ content ])


  return (
    <>
     <Header />
     <Now />
    {
      content == "works" ? (
        <Works />
      ) : content == "labo" ? (
        <Labo />
      ) : content =="hobby" ? (
        <Hobby />
      ) : content == "vision" ? (
        <Philosophy />
      ) : content == "sns" ? (
        <SNS />
      ) : content == "intro" ? (
        <Intro />
      ) : content == "news" ? (
        <News news={ news } />
      ) : (
        <></>
      )
    }
    </>
  )
}

export default ContentManager