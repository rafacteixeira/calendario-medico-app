import React from "react";
import DayEvent from "./DayEvent";

const DayEvents = ({events}) => {
  return (
    <div>
      <DayEvent events={events} watch='manha'/>
      <DayEvent events={events} watch='tarde'/>
      <DayEvent events={events} watch='noite'/>
    </div>
  )
}
export default DayEvents