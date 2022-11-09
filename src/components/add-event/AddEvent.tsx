import React, {useState} from "react";
import {useMedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";
import moment from "moment";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./add-event.css"
import {CalendarContextType, CalendarEventType, CalendarEventWatch, WatchesPerEventType} from "src/models/Models";
import {EventTypeDesc, EventTypeId, EventWatchId, LocalStorageKeys} from "src/enums/enums";

type Props = {
    selectedDate: Date
}

const types = [
    new CalendarEventType(EventTypeId.enf, EventTypeDesc.enf),
    new CalendarEventType(EventTypeId.amb, EventTypeDesc.amb),
    new CalendarEventType(EventTypeId.pla, EventTypeDesc.pla),
    new CalendarEventType(EventTypeId.posp, EventTypeDesc.posp),
    new CalendarEventType(EventTypeId.aula, EventTypeDesc.aula),
];

const DATE_FORMAT = 'DD/MM/YYYY';
const AddEvent = ({selectedDate}: Props) => {

    const {events, saveEvents} = useMedicalCalendarContext() as CalendarContextType
    const [type, setType] = useState("")
    const [watch, setWatch] = useState("")
    const [watches, setWatches] = useState<CalendarEventWatch[]>([])

    function clearMorningEvents() {
        return events.filter((current) => {
                let mCurrDate = moment(current.Date)
                let mSelectedDate = moment(selectedDate)
                return !mCurrDate.isSame(mSelectedDate) || current.Watch !== EventWatchId.manha
            }
        )
    }

    function checkIfAvailableWatch(type: string, watch: string) {

        const watchList = WatchesPerEventType[type];

        let found = watchList.find((current:CalendarEventWatch) => {
            return current.id === watch
        });

        return found !== undefined;
    }

    const addEvent = () => {
        if(type && watch
            && checkIfAvailableWatch(type, watch)) {
            let event = {
                Date: selectedDate,
                Type: type,
                Watch: watch
            }
            let eventList
            if (event.Type === EventTypeId.posp) {
                eventList = clearMorningEvents()
            } else {
                eventList = [...events]
            }

            localStorage.setItem(LocalStorageKeys.events, JSON.stringify([...eventList, event]))
            saveEvents(JSON.parse(localStorage.getItem(LocalStorageKeys.events)!))
        }
    }

    const clearDay = () => {
        let newContext = events.filter((current) => {
            let mCurrDate = moment(current.Date)
            let mSelectedDate = moment(selectedDate)

            return !mCurrDate.isSame(mSelectedDate)
        })
        localStorage.setItem(LocalStorageKeys.events, JSON.stringify([...newContext]))
        saveEvents(JSON.parse(localStorage.getItem(LocalStorageKeys.events)!))
    }

    let formattedDate = moment(selectedDate).format(DATE_FORMAT);

    const filterWatches = (typeId: string) => {
        let list = WatchesPerEventType[typeId]
        setWatches(list)
    }


    return (
        <div>
            <form className="addForm">
                <div className="inputWrapper">
                    <b><label>Data: {formattedDate} </label></b>
                    <br/>
                    <label>Altere a data clicando no calendário abaixo</label>
                </div>
                <div className="inputWrapper">
                    <label>Tipo:</label>
                    <DropdownList
                        defaultValue={type}
                        data={types}
                        dataKey='id'
                        textField='name'
                        onChange={(newValue) => {
                            setType(newValue.id)
                            filterWatches(newValue.id)
                        }}
                    />
                </div>
                <div className="inputWrapper">
                    <label>Turno:</label>
                    <DropdownList
                        defaultValue={watch}
                        data={watches}
                        dataKey='id'
                        textField='name'
                        onChange={(newValue: CalendarEventWatch) => {
                            setWatch(newValue.id)
                        }}
                    />
                </div>
                <div className="actionsCentered">
                    <button className="button clear-input" type="button" onClick={clearDay}>Limpar Dia
                    </button>
                    <button className="button save-input" type="button" onClick={addEvent}>Salvar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddEvent