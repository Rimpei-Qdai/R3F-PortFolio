import { Suspense, useEffect, useState } from 'react'
import './app.css'
import Experience from "./components/Experience"
import Loader from './Loader'
import { Route, Routes } from 'react-router-dom'
import Works from './components/Works'
import ContentManager from './components/ContentManager'


function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if(loaded) {
        document.querySelector('.loading').classList.add('unview')
      }
    },3000)
  }, [ loaded ])

  return (
    <>
    <div className="global-cover" onClick={() => {
          const globalContainer = document.querySelector("#global-container")
          globalContainer.classList.toggle("open")
          const globalCover = document.querySelector(".global-cover")
          globalCover.classList.toggle("open")
          const hamburgerButton = document.querySelector(".hamburger-menu")
          hamburgerButton.classList.toggle("open")

      }}></div>
    <div id="global-container">
      <Loader />
      
      <ContentManager />
      <Experience onLoaded={() => setLoaded(true)} />
    </div>
    </>
  )
}

export default App
