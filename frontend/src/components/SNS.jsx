import React from 'react'
import '../styles/sns.css'
import '../styles/works.css'

const SNS = () => {
  return (
    <>
        <div id="twoD-content" className='down sns'>
          <h2 className="title center">
            <p>S</p>
            <p>N</p>
            <p>S</p>
          </h2>
          <a href='#' className="back-button right">
            <span></span>
            <span></span>
          </a>

          <ul className="sns-list">
            <li className="sns-item">
              <a href="https://x.com/sadalmelik2002" target="_blank" className="link">X</a>
            </li>
            <li className="sns-item">
              <a href="https://www.facebook.com/profile.php?id=100086779051895" target="_blank" className="link">FaceBook</a>
            </li>
            <li className="sns-item">
              <a href="https://www.wantedly.com/id/rin_hata" target="_blank" className="link">Wantedly</a>
            </li>
            <li className="sns-item">
              <a href="https://www.instagram.com/rimpei3188/" target="_blank" className="link">Instagram</a>
            </li>
            <li className="sns-item">
              <a href="https://www.strava.com/athletes/80879326" target="_blank" className="link">Strava</a>
            </li>
            {/* <li className="sns-item">
              <a href="mailto:info@rimpei-hata.com" target="_blank" className="link">Mail</a>
            </li> */}
          </ul>
          <div className="footer">© 2025 Rimpei.H</div>
        </div>
    </>
  )
}

export default SNS