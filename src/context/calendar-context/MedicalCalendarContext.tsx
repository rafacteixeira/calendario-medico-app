import React, {createContext, FC, PropsWithChildren, useContext} from "react";
import {CalendarContextType, CalendarEvent} from "src/models/Models";

export const MedicalCalendarContext = createContext<CalendarContextType | null>(null)

const MedicalCalendarContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [events, setEvents] = React.useState<CalendarEvent[]>([]);

    const saveEvents = (eventList: CalendarEvent[]): void => {
        setEvents([...eventList])
    }

    return (
        <MedicalCalendarContext.Provider value={{events, saveEvents}}>
            {children}
        </MedicalCalendarContext.Provider>
    )
}

export default MedicalCalendarContextProvider

export function useMedicalCalendarContext(): CalendarContextType {
    const context = useContext(MedicalCalendarContext) as CalendarContextType
    if (context === undefined) {
        throw new Error('useMedicalCalendarContext must be used within a MedicalCalendarContextProvider')
    }
    return context
}