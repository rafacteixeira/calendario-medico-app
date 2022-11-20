import React, {useEffect} from "react";

import moment from "moment";
import {useMedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";
import 'react-calendar/dist/Calendar.css';
import EventBlock from "../day-events/EventBlock";
import './Calendar.css'
import {CalendarContextType, CalendarEvent} from "src/models/Models";
import Calendar from "react-calendar";
import {CalendarViewType, MomentGranularity} from "src/enums/enums";
import {useAuthContext} from "../../context/auth-context/AuthContext";
import {getPrivate} from "../../utils/RequestUtils";

type Props = {
  selectedDate: Date,
  selectDate: Function
}

const MedicalCalendar = ({selectedDate, selectDate} :Props) => {
  const {events, saveEvents} = useMedicalCalendarContext() as CalendarContextType
  const {token,} = useAuthContext()

  useEffect(() => {

    const fetch = async () => {
      const json = await getPrivate(token!,"/private/event")
      saveEvents([...json])
    }
    fetch().then(null,null)
    // eslint-disable-next-line
  }, []);


  function filterDateEvents(calendarDate:moment.Moment) : CalendarEvent[] {
    let eventList = new Array<CalendarEvent>()
    events.forEach((current) => {
      let eventDate = moment(current.Date);
      if (calendarDate.isSame(eventDate, MomentGranularity.day)) {
        eventList.push(current)
      }
    })

    return eventList;
  }

  function renderEvents({date, view}:{date:Date, view: string}): JSX.Element {
    if (view === CalendarViewType.month) {
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