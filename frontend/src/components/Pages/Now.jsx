import React from 'react'
import '../../styles/now.css'
import Calender from './Calender.jsx';
import { useHealthData, useSleepData } from '../../hooks/useHealthData'

const Now = () => {
    const { latestItem, isLoading: healthLoading, isError: healthError } = useHealthData();
    const { sleepTime, isLoading: sleepLoading, isError: sleepError } = useSleepData();


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
                <div className="datum-score">
                    {healthLoading ? '...' : healthError ? '-' : latestItem?.cal || 0}
                </div>
                <div className="datum-unit">kcal</div>
            </li>
            <li className="datum">
                <div className="datum-name">歩数</div>
                <div className="datum-score">
                    {healthLoading ? '...' : healthError ? '-' : latestItem?.step || 0}
                </div>
                <div className="datum-unit">steps</div>
            </li>
            <li className="datum long">
                <div className="datum-name">睡眠時間</div>
                <div className="sleep">
                    <div className="datum-score">
                        {sleepLoading ? '...' : sleepError ? '-' : sleepTime?.hour || 0}
                    </div>
                    <div className="datum-unit">時間</div>
                    <div className="datum-score">
                        {sleepLoading ? '...' : sleepError ? '-' : sleepTime?.minutes || 0}
                    </div>
                    <div className="datum-unit">分</div>

                </div>
            </li>
            
        </ul>
    </div>
    </>
  )
}

export default Now