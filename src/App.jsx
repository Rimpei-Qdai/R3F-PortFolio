import { Suspense, useEffect, useState } from 'react'
import './app.css'
import Experience from "./components/Experience"
import Loader from './Loader'


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

      <Experience onLoaded={() => setLoaded(true)} />
    </>
  )
}

export default App
