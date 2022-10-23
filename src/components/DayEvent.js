import React from "react";
import '../DayEvent.css';

const DayEvent = ({events, watch}) => {

  let filtered = events.filter((e) => e.Watch === watch)

  return (
    <div>
      {filtered.map(
        (e) => {
          return (
            <div key={e.Date + e.Type + e.Watch + Math.random()} className={e.Watch}>
              <label className='eventLabel'>{e.Type}</label>
              <br/>
            </div>
          )
        }
      )}
    </div>
  )
}
export default DayEvent