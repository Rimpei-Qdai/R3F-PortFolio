import React, { useEffect, useState } from 'react'
import authData from '../Config'

const Calender = () => {
    let [events, setEvents] = useState({
      遊び:0,
      企業面接:0,
      イベント:0,
      自転車:0,
      研究活動:0,
      インターン:0,
      講義:0
    })

    const eventMessage = {
      イベント:{
        title:"イベントに参加",
        sub:"しているようです"
      },
      自転車:{
        title:"自転車で走り",
        sub:"に行っているようです"
      },
      インターン:{
        title:"インターンに参加",
        sub:"しているようです"
      },
      タスク:{
        title:"溜まったタスク",
        sub:"をこなしているようです"
      },
      企業面接:{
        title:"企業面接",
        sub:"を受けているようです"
      },
      研究活動:{
        title:"研究活動",
        sub:"をしているようです"
      },
      講義:{
        title:"大学で講義",
        sub:"を受けているようです"
      },
      遊び:{
        title:"楽しみな予定",
        sub:"があるようです"
      },
      のんびり:{
        title:"のんびり",
        sub:"しているようです"
      },
    }

    const [ eventsCount, setEventsCount ] = useState(0)
    const [ taskCount, setTaskCount ] = useState(0)
    const [ mainEvent, setMainEvent ] = useState("")
    const [ loaded, setLoaded ] = useState(false)
    const [ location, setLocation ] = useState("")
    
    const getEvents = async () => {
      const today = new Date()
        const timeMin = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const timeMax = new Date(today.setHours(23, 59, 59, 999)).toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${authData.calendarId}/events?key=${authData.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

        const response = await fetch(url);
        const data = await response.json();
        return data.items
        
    }

    const calcParams = (data) => {
        //各イベントの数をカウントして保存
      data.forEach(datum => {
        if(datum.summary != "タスク") {
          events[datum.summary]++
          setEvents(events)
        }
        if(datum.summary == "タスク") {
          setTaskCount(prev => prev + 1)
        } else {
          setEventsCount(prev => prev + 1)
        }
        
        if(datum.summary == "イベント" || datum.summary == "インターン") {
        setLocation(datum.location)
        }

      })
      setMainEvent(Object.keys(events).reduce((a, b) =>
        events[a] > events[b] ? a : b
      ))
      

      
    }
      useEffect(() => {
        const fetchData = async () => {
          const data = await getEvents()
          console.log(data)
          
          calcParams(data)
          setLoaded(true)
          
        }
        
        fetchData()
        
      }, [ ])

  return (
    <>
      {loaded ? (
        <>
        {/* 予定表示 */}
          { eventsCount == 0 && taskCount > 0 ? (
            <>
              <div className='message-title'>{ eventMessage["タスク"].title }</div>
              <div className='message-sub-title'>{ eventMessage["タスク"].sub }</div>
            </>
          ) : eventsCount == 0 && taskCount == 0 ? (
            <>
              <div className='message-title'>{ eventMessage["のんびり"].title }</div>
              <div className='message-sub-title'>{ eventMessage["のんびり"].sub }</div>
            </>
          ) : (
            <>
              {mainEvent == "イベント" || mainEvent == "インターン" ? (
                <>
                  <div className='message-title'>
                    <a href={ location } target='_blank'>
                      { eventMessage[mainEvent].title }
                    </a>
                  </div>
                  <div className='message-sub-title'>{ eventMessage[mainEvent].sub }</div>
                </>
              ) : (
                <>
                 <div className='message-title'>{ eventMessage[mainEvent].title }</div>
                 <div className='message-sub-title'>{ eventMessage[mainEvent].sub }</div>
                </>
              )}
              
            </>
          )}


          {/* 忙しさ表示 */}
        
          { (eventsCount + taskCount) == 0 ? (
            <>
                <div className="busy-title zero">忙しさ：0</div>
                <img className='busy_level' src="/assets/imgs/busy_zero.svg" alt="" />
              </>
            ) : (eventsCount + taskCount) == 1 ? (
              <>
                <div className="busy-title low">忙しさ：低</div>
                <img className='busy_level' src="/assets/imgs/busy_low.svg" alt="" />
              </>
            ) :  (eventsCount + taskCount) == 2 ? (
              <>
                <div className="busy-title mid">忙しさ：中</div>
                <img className='busy_level' src="/assets/imgs/busy_mid.svg" alt="" />
              </>
            ) : (eventsCount + taskCount) >= 3 ? (
              <>
                <div className="busy-title high">忙しさ：高</div>
                <img className='busy_level' src="/assets/imgs/busy_high.svg" alt="" />
              </>
            ) : (
              <>
                <div className="busy-title mid">忙しさ：中</div>
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