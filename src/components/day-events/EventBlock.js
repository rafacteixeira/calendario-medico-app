import React from "react";
import EventList from "./EventList";
import './day-event.css'

const EventBlock = ({events, deleteEvent}) => {
  return (
    <div className='dailyEventList'>
      <EventList events={events} watch='manha' deleteEvent={deleteEvent}/>
      <EventList events={events} watch='tarde' deleteEvent={deleteEvent}/>
      <EventList events={events} watch='noite' deleteEvent={deleteEvent}/>
    </div>
  )
}
export default EventBlock