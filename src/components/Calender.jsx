import React, { useEffect, useState } from 'react'
import authData from '../Config'

const Calender = () => {
    let [events, setEvents] = useState({
      イベント:0,
      自転車:0,
      インターン:0,
      タスク:0,
      企業面接:0,
      研究活動:0,
      講義:0,
      遊び:0,
    })

    const eventMessage = {
      イベント:{
        title:"イベントに参加",
        sub:"しているようです"
      },
      自転車:{
        title:"自転車で走りに",
        sub:"行っているようです"
      },
      インターン:{
        title:"インターンに参加",
        sub:"しているようです"
      },
      タスク:{
        title:"溜まったタスクを",
        sub:"こなしているようです"
      },
      企業面接:{
        title:"企業面接を",
        sub:"受けているようです"
      },
      研究活動:{
        title:"研究活動を",
        sub:"しているようです"
      },
      講義:{
        title:"大学で講義を",
        sub:"受けているようです"
      },
      遊び:{
        title:"楽しみな予定が",
        sub:"あるようです"
      },
    }

    const [ eventsCount, setEventsCount ] = useState(0)
    const [ taskCount, setTaskCount ] = useState(0)
    const [ mainEvent, setMainEvent ] = useState("")
    const [ loaded, setLoaded ] = useState(false)
    
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
        events[datum.summary]++
        setEvents(events)
        if(datum.summary == "タスク") {
          setTaskCount(prev => prev + 1)
        } else {
          setEventsCount(prev => prev + 1)
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
          <div className='message-title'>{ eventMessage[mainEvent].title }</div>
          <div className='message-sub-title'>{ eventMessage[mainEvent].sub }</div>
          <div>{ eventsCount }</div>
          <div>{ taskCount }</div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Calender