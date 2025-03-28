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
    if(loaded) {
      document.querySelector('.loading').classList.add('unview')
    }
  }, [ loaded ])

  return (
    <>
      <Loader />
      
      <ContentManager />
      <Experience onLoaded={() => setLoaded(true)} />
    </>
  )
}

export default App
