import React from 'react'
import '../styles/sns.css'
import '../styles/works.css'

const SNS = () => {
  return (
    <>
        <div id="twoD-content" className='down sns'>
          <h2 className="title center">SNS</h2>
          <a href='#' className="back-button right">
            <span></span>
            <span></span>
          </a>

          <ul className="sns-list">
            <li className="sns-item">
              <a href="https://x.com" target="_blank" className="link">X</a>
            </li>
            <li className="sns-item">
              <a href="https://x.com" target="_blank" className="link">Instagram</a>
            </li>
            <li className="sns-item">
              <a href="https://x.com" target="_blank" className="link">FaceBook</a>
            </li>
            <li className="sns-item">
              <a href="https://x.com" target="_blank" className="link">Mail</a>
            </li>
            <li className="sns-item">
              <a href="https://x.com" target="_blank" className="link">Strava</a>
            </li>
          </ul>
          <div className="footer">© 2025 Rimpei.H</div>
        </div>
    </>
  )
}

export default SNS