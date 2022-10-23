import React from "react";
import DayEvent from "./DayEvent";
import '../DayEvent.css'

const DayEvents = ({events}) => {
  return (
    <div className='dailyEventList'>
      <DayEvent events={events} watch='manha'/>
      <DayEvent events={events} watch='tarde'/>
      <DayEvent events={events} watch='noite'/>
    </div>
  )
}
export default DayEvents