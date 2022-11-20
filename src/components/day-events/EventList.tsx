import React from "react";
import './day-event.css';
import {useMedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";
import {CalendarContextType, CalendarEvent} from "src/models/Models";
import {EventTypeId} from "src/enums/enums";
import {deletePrivate} from "../../utils/RequestUtils";
import {useAuthContext} from "../../context/auth-context/AuthContext";

type EventListProps = {
    eventList: CalendarEvent[]
    watch: 'manha' | 'tarde' | 'noite'
}

const EventList = ({eventList, watch}: EventListProps) => {
    const {token,} = useAuthContext()
    const {events, saveEvents} = useMedicalCalendarContext() as CalendarContextType

    let filtered = eventList ? eventList.filter((e) => e.Watch === watch) : []

    function deleteEvent(event: CalendarEvent) {
        let del = window.confirm(`Deseja remover o evento ${event.Type}?`)
        if (del) {
            let filtered = events.filter(
                (e) => {
                    let filter = !(e.Date === event.Date && e.Type === event.Type && e.Watch === event.Watch);
                    if (!filter) {
                        deletePrivate(token!, "/private/event", e).then(null, null)
                    }
                    return filter;
                }
            );
            saveEvents(filtered)
        }
    }


    return (
        <div>
            {filtered.map(
                (e) => {
                    return (
                        <div
                            key={e.Date + e.Type + e.Watch + Math.random()}
                            className={e.Type !== EventTypeId.posp && e.Type !== EventTypeId.aula ? e.Type + '-' + e.Watch : e.Type}>
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
