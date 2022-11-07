import {useContext, useState} from "react";
import {MedicalCalendarContext} from "src/context/calendar-context/MedicalCalendarContext";
import moment from "moment";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./add-event.css"
import {CalendarContextType, CalendarEventType, CalendarEventWatch} from "src/models/Models";

type Props = {
    selectedDate : Date
}

const AddEvent = ({selectedDate}: Props) => {

    let types = [
        new CalendarEventType('Enf', 'Enfermaria'),
        new CalendarEventType('Amb', 'Ambulatório'),
        new CalendarEventType('Pla', 'Plantão'),
        new CalendarEventType('PosP', 'Pós Plantão'),
        new CalendarEventType('Aula', 'Aula'),
    ];


    const {events, saveEvents} = useContext(MedicalCalendarContext) as CalendarContextType
    const [type, setType] = useState("")
    const [watch, setWatch] = useState("")
    const [watches, setWatches] = useState([])

    function clearMorningEvents() {
        return events.filter((current) => {
                let mCurrDate = moment(current.Date)
                let mSelectedDate = moment(selectedDate)
                return !mCurrDate.isSame(mSelectedDate) || current.watch.id !== 'manha'
            }
        )
    }

    const addEvent = () => {
        let event = {
            Date: selectedDate,
            Type: type,
            Watch: watch
        }
        let eventList
        if (event.Type === 'PosP') {
            eventList = clearMorningEvents()
        } else {
            eventList = [...events]
        }

        localStorage.setItem("events", JSON.stringify([...eventList, event]))
        saveEvents(JSON.parse(localStorage.getItem('events')))
    }

    const clearDay = () => {
        let newContext = events.filter((current) => {
            let mCurrDate = moment(current.Date)
            let mSelectedDate = moment(selectedDate)

            return !mCurrDate.isSame(mSelectedDate)
        })
        localStorage.setItem("events", JSON.stringify([...newContext]))
        saveEvents(JSON.parse(localStorage.getItem('events')))
    }

    let formattedDate = moment(selectedDate).format('DD/MM/YYYY');

    const filterWatches = (typeId:string) => {
        let list = []
        if( typeId === 'Enf') {
            list.push({id: 'manha', name: 'Manhã'})
        } else if (typeId === 'Amb') {
            list.push({id: 'manha', name: 'Manhã'},{id: 'tarde', name: 'Tarde'})
        } else if (typeId === 'Aula') {
            list.push({id: 'manha', name: 'Manhã'})
        } else if (typeId === 'Pla') {
            list.push({id: 'manha', name: 'Manhã'},{id: 'noite', name: 'Noite'})
        } else if (typeId === 'PosP') {
            list.push({id: 'manha', name: 'Manhã'})
        }
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
                    <button className="button clear-input" type="button" onClick={() => clearDay()}>Limpar Dia
                    </button>
                    <button className="button save-input" type="button" onClick={() => addEvent()}>Salvar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddEvent