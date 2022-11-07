import React, {useContext} from "react";
import './day-event.css';
import {MedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";

const EventList = ({events, watch}) => {

  const [mcContext, setMcContext] = useContext(MedicalCalendarContext)

  let filtered = events.filter((e) => e.Watch === watch)

  function deleteEvent(event: {}){
    let del = window.confirm(`Deseja remover o evento ${event.Type}?`)
    if (del) {
      let filtered = mcContext.filter(
        (e) => {
          return !(e.Date === event.Date && e.Type === event.Type && e.Watch === event.Watch);
        }
      );
      setMcContext(filtered)
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
              className={e.Type !== 'PosP' && e.Type !== 'Aula' ? e.Type + '-' + e.Watch : e.Type}>
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
