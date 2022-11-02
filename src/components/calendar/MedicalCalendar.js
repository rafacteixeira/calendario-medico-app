import React, {useContext, useEffect} from "react";
import Calendar from "react-calendar";
import moment from "moment";
import {MedicalCalendarContext} from "../../context/calendar-context/MedicalCalendarContext";
import 'react-calendar/dist/Calendar.css';
import EventBlock from "../day-events/EventBlock";
import './Calendar.css'

const MedicalCalendar = ({selectedDate, selectDate}) => {
  const [mcContext, setMcContext] = useContext(MedicalCalendarContext)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('events'));
    if (items) {
      setMcContext(items)
    }
    // eslint-disable-next-line
  }, []);


  function filterDateEvents(calendarDate) {
    let events = [];
    mcContext.forEach((current) => {
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
        return <EventBlock events={dayEvents} deleteEvent={deleteEvent}/>;
      }
    }
  }

  function deleteEvent(event){
    let del = window.confirm(`Deseja remover o evento ${event.Type}?`)
    console.log(del)
    if (del) {
      let filtered = mcContext.filter(
        (e) => (e.Date !== event.Date) || (e.Type !== event.Type && e.Watch !== event.watch)
      );
      setMcContext(filtered)
      localStorage.setItem("events", JSON.stringify([...filtered]))
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

export default MedicalCalendar;