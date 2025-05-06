import React from 'react'
import '../styles/now.css'

const Now = () => {
  return (
    <>
    <div className="reat-time-data">
        <div className="title">
            <p>N</p>
            <p>O</p>
            <p>W</p>
        </div>
        <div className="back-button" onClick={() => {
            const realTimeDataDOM = document.querySelector('.reat-time-data')
            realTimeDataDOM.classList.toggle('view')
            
            const coverDOM = document.querySelector('.global-cover-for-data')
            coverDOM.classList.toggle('open')
        }}>
            <span></span>
            <span></span>
        </div>
        <div className="sub-title">今日のりんぺい</div>
        <ul className="data">
            <li className="datum">
                <div className="datum-name">消費カロリー</div>
                <div className="datum-score">133</div>
                <div className="datum-unit">kcal</div>
            </li>
            <li className="datum">
                <div className="datum-name">歩数</div>
                <div className="datum-score">133</div>
                <div className="datum-unit">歩</div>
            </li>
            
        </ul>
    </div>
    </>
  )
}

export default Now