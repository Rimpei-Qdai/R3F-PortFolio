import React, { useEffect, useState } from 'react'
import '../styles/now.css'
import Calender from './Calender';

const Now = () => {
    const [latestItem, setLatestItem] = useState({cal:100, step:300});

    useEffect(() => {
        fetch("http://localhost:8080/api/nowdata").then(res => res.json()).then((data) => {
            console.log(data)
            setLatestItem(data)
        })
        fetch("http://localhost:8080/api/sleeptime").then(res => res.json()).then((text) => {
            console.log(text)
        })
        // getData()
    }, [])


  return (
    <>
    <div className="reat-time-data">
        <div className="title">
            <p>N</p>
            <p>O</p>
            <p>W</p>
        </div>
        <div className="now-back-button" onClick={() => {
            const realTimeDataDOM = document.querySelector('.reat-time-data')
            realTimeDataDOM.classList.toggle('view')
            
            const coverDOM = document.querySelector('.global-cover-for-data')
            coverDOM.classList.toggle('open')
        }}>
            <span></span>
            <span></span>
        </div>
        <div className="sub-title">今日のりんぺいは</div>
        <ul className="data">
                  <Calender />
            <li className="datum">
                <div className="datum-name">消費</div>
                <div className="datum-score">{ latestItem.cal }</div>
                <div className="datum-unit">kcal</div>
            </li>
            <li className="datum">
                <div className="datum-name">歩数</div>
                <div className="datum-score">{ latestItem.step }</div>
                <div className="datum-unit">steps</div>
            </li>
            
        </ul>
    </div>
    </>
  )
}

export default Now