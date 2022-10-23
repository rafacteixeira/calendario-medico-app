import React, {useContext} from "react";
import Calendar from "react-calendar";
import moment from "moment";
import {SCContext} from "./SCContext";
import 'react-calendar/dist/Calendar.css';
import DayEvents from "./DayEvents";
import '../Calendar.css'

const SCalendar = ({selectedDate, selectDate}) => {
  const [scContext,] = useContext(SCContext)

  function filterDateEvents(calendarDate) {
    let events = [];
    scContext.forEach((current) => {
      let eventDate = moment(current.Date);
      if (calendarDate.isSame(eventDate, 'day')) {
        events.push(current)
      }
    })

    return events;
  }

  function renderEvents({date, view}) {
    if (view === "month") {
      const currentDate = moment(date);
      let dayEvents = filterDateEvents(currentDate)
      if (dayEvents && dayEvents.length > 0) {
        return <DayEvents events={dayEvents}/>;
      }
    }
  }

  return (
    <div>
      <Calendar
        defaultActiveStartDate={new Date()}
        defaultView="month"
        tileContent={renderEvents}
        value={selectedDate}
        onChange={(e) => {
          selectDate(e)
        }}
        tileClassName='calendarTile'
      />
    </div>
  );
};

export default SCalendar;