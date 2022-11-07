import React, {createContext, FC, PropsWithChildren, ReactNode, useState} from "react";
import {CalendarContextType, CalendarEvent} from "src/models/Models";
import eventList from "src/components/day-events/EventList";

export const MedicalCalendarContext = createContext<CalendarContextType | null>(null)

const MedicalCalendarContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [events, setEvents] = React.useState<CalendarEvent[]>([]);

    const saveEvent = (e: CalendarEvent): void => {
        setEvents([...events, e])
    }

    const saveEvents = (eventList: CalendarEvent[]): void => {
        setEvents([...eventList])
    }

    return (
        <MedicalCalendarContext.Provider value={{events, saveEvent, saveEvents}}>
            {children}
        </MedicalCalendarContext.Provider>
    )
}

export default MedicalCalendarContextProvider