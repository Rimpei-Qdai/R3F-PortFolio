import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <>
        <div className="loading">
           <div id="container">
                <span></span>
                <span></span>
                <span></span>
                <p>LOADING</p>
            </div>
        </div>
    </>
)
}

export default Loader