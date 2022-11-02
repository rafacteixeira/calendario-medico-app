import React from "react";
import EventList from "./EventList";
import './day-event.css'

const EventBlock = ({events}) => {
  return (
    <div className='dailyEventList'>
      <EventList events={events} watch='manha'/>
      <EventList events={events} watch='tarde'/>
      <EventList events={events} watch='noite'/>
    </div>
  )
}
export default EventBlock