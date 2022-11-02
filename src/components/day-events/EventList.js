import React, {useEffect, useState} from "react";
import './day-event.css';

const EventList = ({events, watch}) => {
  const [localEvents, setLocalEvents] = useState([]);

  useEffect(
    () => {
      setLocalEvents(events.filter((e) => e.Watch === watch))
    }, []
  )

  function deleteEvent(event){
    let del = window.confirm(`Deseja remover o evento ${event.Type}?`)
    console.log(del)
    if (del) {
      setLocalEvents(localEvents.filter((e) => e.Type !== event.Type && e.Watch !== event.watch))
    }
  }

  return (
    <div>
      {localEvents &&
        localEvents.map(
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
