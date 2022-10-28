import React, {useContext, useEffect} from "react";
import Calendar from "react-calendar";
import moment from "moment";
import {SCContext} from "../calendar-context/SCContext";
import 'react-calendar/dist/Calendar.css';
import DayEvents from "../day-events/DayEvents";
import './Calendar.css'

const SCalendar = ({selectedDate, selectDate}) => {
  const [scContext, setScContext] = useContext(SCContext)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('events'));
    if (items) {
      setScContext(items)
    }
    // eslint-disable-next-line
  }, []);


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