import React from "react";
import './day-event.css';

const EventList = ({events, watch, deleteEvent}) => {

  let filtered = events.filter((e) => e.Watch === watch)

  return (
    <div>
      {filtered.map(
        (e) => {
          return (
            <div
              key={e.Date + e.Type + e.Watch + Math.random()}
              className={e.Type !== 'PosP' && e.Type !== 'Aula' ? e.Type + '-' + e.Watch : e.Type}
              onClick={() => deleteEvent(e)}
            >
              <label className='eventLabels'>{e.Type}</label>
              <br/>
            </div>
          )
        }
      )}
    </div>
  )
}
export default EventList
