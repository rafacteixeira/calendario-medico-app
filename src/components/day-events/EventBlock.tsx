import React from "react";
import EventList from "./EventList";
import './day-event.css'
import {CalendarEvent} from "src/models/Models";

const EventBlock = ({events}:{events:CalendarEvent[]}) => {
  return (
    <div className='dailyEventList'>
      <EventList eventList={events} watch='manha'/>
      <EventList eventList={events} watch='tarde'/>
      <EventList eventList={events} watch='noite'/>
    </div>
  )
}
export default EventBlock