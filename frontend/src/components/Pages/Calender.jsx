import React from 'react'
import { useCalendarData } from '../../hooks/useCalendarData'

const Calender = () => {

    const { todayEvent, isLoading, isError } = useCalendarData();

  return (
    <>
      {!isLoading && !isError && todayEvent ? (
        <>
        {/* 予定表示 */}
        { todayEvent.main_event == "イベント" ? (
          <>
            <div className='message-title'>
              <a href={ todayEvent.location } target='_blank'>
                { todayEvent.message.title }
              </a>
              </div>
            <div className='message-sub-title'>{ todayEvent.message.sub }</div>
          </>
        ) :
        (
          <>
            <div className='message-title'>{ todayEvent.message.title }</div>
            <div className='message-sub-title'>{ todayEvent.message.sub }</div>
          </>
        )}


          {/* 忙しさ表示 */}
        
          { (todayEvent.events_count + todayEvent.task_count) == 0 ? (
            <>
                <div className="busy-title zero">忙しさ：<p>0</p></div>
                <img className='busy_level' src="/assets/imgs/busy_zero.svg" alt="" />
              </>
            ) : (todayEvent.events_count + todayEvent.task_count) == 1 ? (
              <>
                <div className="busy-title low">忙しさ：<p>低</p></div>
                <img className='busy_level' src="/assets/imgs/busy_low.svg" alt="" />
              </>
            ) :  (todayEvent.events_count + todayEvent.task_count) == 2 ? (
              <>
                <div className="busy-title mid">忙しさ： <p>中</p></div>
                <img className='busy_level' src="/assets/imgs/busy_mid.svg" alt="" />
              </>
            ) : (todayEvent.events_count + todayEvent.task_count) >= 3 && (todayEvent.events_count + todayEvent.task_count) < 4 ? (
              <>
                <div className="busy-title high">忙しさ： <p>高</p></div>
                <img className='busy_level' src="/assets/imgs/busy_high.svg" alt="" />
              </>
            ) : (todayEvent.events_count + todayEvent.task_count) >= 4 ? (
              <>
                <div className="busy-title max">忙しさ： <p>MAX</p></div>
                <img className='busy_level' src="/assets/imgs/busy_max.svg" alt="" />
              </>
            ) : (
              <>
                <div className="busy-title mid">忙しさ： <p>中</p></div>
                <img className='busy_level' src="/assets/imgs/busy_mid.svg" alt="" />
              </>
            )
          }
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Calender