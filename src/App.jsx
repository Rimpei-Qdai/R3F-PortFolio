import { Suspense, useEffect, useState } from 'react'
import './app.css'
import Experience from "./components/Experience"
import Loader from './Loader'
import { Route, Routes } from 'react-router-dom'
import Works from './components/Works'
import ContentManager from './components/ContentManager'
import Calender from './components/Calender'


function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if(loaded) {
        document.querySelector('.loading').classList.add('unview')
      }
    },3200)
  }, [ loaded ])

  return (
    <>
    <h1>りんぺいのポートフォリオ</h1>
    <div className="global-cover-for-data"></div>
    <div className="global-cover" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")

          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")

          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}></div>
      
      <ul className="menu-list">
        <div className="title">
          <p>M</p>
          <p>E</p>
          <p>N</p>
          <p>U</p>
        </div>
        <li className="menu-item">
          <a href="#intro" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}>
        <div className="menu-title">
          INTRO
        </div>
        <div className="sub-title">自己紹介</div>
        </a>
        </li>
        <li className="menu-item">
          <a href="#works" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}>
        <div className="menu-title">
          WORKS
        </div>
        <div className="sub-title">開発実績</div>
        </a>
        </li>
        
        <li className="menu-item">
          <a href="#labo" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}>
        <div className="menu-title">
          LABO
        </div>
              <div className="sub-title">研究紹介</div>
        </a>
        </li>

<li className="menu-item">
          <a href="#vision" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}>
        <div className="menu-title">
          VISION
        </div>
          <div className="sub-title">理念</div>
      </a>
        </li>

        <li className="menu-item">
          <a href="#hobby" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}>
        <div className="menu-title">
          HOBBY
        </div>
        <div className="sub-title">趣味</div>
      </a>
        </li>
        <li className="menu-item">
          <a href="#sns" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

          const menuList = document.querySelector(".menu-list")
          menuList.classList.toggle('open')

      }}>
        <div className="menu-title">
          SNS
        </div>
        <div className="sub-title">コンタクト</div>
      </a>
        </li>

      </ul>
    <div id="global-container">
      <Loader />
      <ContentManager />
      <Experience onLoaded={() => setLoaded(true)} />
    </div>
    </>
  )
}

export default App
