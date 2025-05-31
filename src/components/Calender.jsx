import React, { useEffect } from 'react'
import authData from '../Config'

const Calender = () => {
    const getEvents = async () => {
      const today = new Date()
        const timeMin = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const timeMax = new Date(today.setHours(23, 59, 59, 999)).toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${authData.calendarId}/events?key=${authData.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data.items); // イベント一覧
        data.items.forEach(datum => {
          console.log(datum.summary)
        })
    }
    useEffect(() => {
        getEvents()
    }, [ ])
  return (
    <></>
  )
}

export default Calender