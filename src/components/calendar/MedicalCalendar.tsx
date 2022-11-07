import React, {useContext, useEffect} from "react";

import moment from "moment";
import {MedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";
import 'react-calendar/dist/Calendar.css';
import EventBlock from "../day-events/EventBlock";
import './Calendar.css'
import {CalendarContextType, CalendarEvent} from "src/models/Models";
import Calendar from "react-calendar";

type Props = {
  selectedDate: Date,
  selectDate: Function
}

const MedicalCalendar = ({selectedDate, selectDate} :Props) => {
  const {events, saveEvents} = useContext(MedicalCalendarContext) as CalendarContextType

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('events')!);
    if (items) {
      saveEvents(items)
    }
    // eslint-disable-next-line
  }, []);


  function filterDateEvents(calendarDate:moment.Moment) : CalendarEvent[] {
    let eventList = new Array<CalendarEvent>()
    events.forEach((current) => {
      let eventDate = moment(current.Date);
      if (calendarDate.isSame(eventDate, 'day')) {
        eventList.push(current)
      }
    })

    return eventList;
  }

  function renderEvents({date, view}:{date:Date, view: any}): JSX.Element {
    if (view === "month") {
      const currentDate = moment(date);
      let dayEvents = filterDateEvents(currentDate)
      if (dayEvents && dayEvents.length > 0) {
        return <EventBlock events={dayEvents}/>;
      }
    }
    return <div/>;
  }

  return (
    <div>
      <Calendar
        defaultActiveStartDate={new Date()}
        defaultView="month"
        tileContent={renderEvents}
        value={selectedDate}
        onChange={(e: Date) => {
          selectDate(e)
        }}
        tileClassName='calendarTile'
      />
    </div>
  );
};

export default MedicalCalendar;