import {EventWatchDesc, EventWatchId} from "src/enums/enums";

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
    Type: string
    Watch: string
}

export type CalendarContextType = {
    events: CalendarEvent[]
    saveEvents: (e: CalendarEvent[]) => void
}

const manha = new CalendarEventWatch(EventWatchId.manha, EventWatchDesc.manha);
const tarde = new CalendarEventWatch(EventWatchId.tarde, EventWatchDesc.tarde);
const noite = new CalendarEventWatch(EventWatchId.noite, EventWatchDesc.noite);

export const WatchesPerEventType: Record<string, CalendarEventWatch[]> = {
    Enf: [manha],
    Amb: [manha, tarde],
    Aula: [manha],
    Pla: [manha, noite],
    PosP: [manha]
}