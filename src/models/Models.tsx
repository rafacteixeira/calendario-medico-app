export class CalendarEventType {
    id: string
    name: string

    constructor(id:string, name:string) {
        this.id = id
        this.name = name
    }
}

export class CalendarEventWatch {
    id: string
    name: string

    constructor(id:string, name:string) {
        this.id = id
        this.name = name
    }
}

export interface CalendarEvent {
    Date: Date
    type: CalendarEventType
    watch: CalendarEventWatch
}

export type CalendarContextType = {
    events: CalendarEvent[]
    saveEvent: (e: CalendarEvent) => void
    saveEvents: (e: CalendarEvent[]) => void
}