import React, {useContext} from "react";
import './day-event.css';
import {MedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";
import {CalendarContextType, CalendarEvent} from "src/models/Models";

const EventList = ({eventList, watch}:{eventList:CalendarEvent[], watch:string}) => {

  const {events, saveEvents} = useContext(MedicalCalendarContext) as CalendarContextType
  // const [mcContext, setMcContext] = useContext(MedicalCalendarContext)

  let filtered = eventList ? eventList.filter((e) => e.Watch === watch) : []

  function deleteEvent(event: CalendarEvent){
    let del = window.confirm(`Deseja remover o evento ${event.Type}?`)
    if (del) {
      let filtered = events.filter(
        (e) => {
          return !(e.Date === event.Date && e.Type === event.Type && e.Watch === event.Watch);
        }
      );
      saveEvents(filtered)
      localStorage.setItem("events", JSON.stringify([...filtered]))
    }
  }


  return (
    <div>
      {filtered.map(
        (e) => {
          return (
            <div
              key={e.Date + e.Type + e.Watch + Math.random()}
              className={e.Type !== 'PosP' && e.Type !== 'Aula' ? e.Type + '-' + e.Watch: e.Type}>
              <label className='eventLabels' onClick={() => deleteEvent(e)}>{e.Type}</label>
              <br/>
            </div>
          )
        }
      )}
    </div>
  )
}
export default EventList