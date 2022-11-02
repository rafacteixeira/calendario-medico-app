import {useContext, useState} from "react";
import {MedicalCalendarContext} from "../../context/calendar-context/MedicalCalendarContext";
import moment from "moment";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./add-event.css"

const AddEvent = ({selectedDate}) => {
  const [mcContext, setMcContext] = useContext(MedicalCalendarContext)
  const [type, setType] = useState("")
  const [watch, setWatch] = useState("")

  function clearMorningEvents() {
    return mcContext.filter((current) => {
        let mCurrDate = moment(current.Date)
        let mSelectedDate = moment(selectedDate)
        return !mCurrDate.isSame(mSelectedDate) || current.Watch !== 'manha'
      }
    )
  }

  const addEvent = () => {
    let event = {
      Date: selectedDate,
      Type: type,
      Watch: watch
    }
    let events
    if (event.Type === 'PosP') {
      events = clearMorningEvents()
    } else {
      events = [...mcContext]
    }

    localStorage.setItem("events", JSON.stringify([...events, event]))
    setMcContext(JSON.parse(localStorage.getItem('events')))
  }

  const clearDay = () => {
    let newContext = mcContext.filter((current) => {
      let mCurrDate = moment(current.Date)
      let mSelectedDate = moment(selectedDate)

      return !mCurrDate.isSame(mSelectedDate)
    })
    localStorage.setItem("events", JSON.stringify([...newContext]))
    setMcContext(JSON.parse(localStorage.getItem('events')))
  }

  let formattedDate = moment(selectedDate).format('DD/MM/YYYY');

  let types = [
    {id: 'Enf', name: 'Enfermaria'},
    {id: 'Amb', name: 'Ambulatório'},
    {id: 'Pla', name: 'Plantão'},
    {id: 'PosP', name: 'Pós Plantão'},
    {id: 'Aula', name: 'Aula'},
  ];

  let watches = [
    {id: 'manha', name: 'Manhã'},
    {id: 'tarde', name: 'Tarde'},
    {id: 'noite', name: 'Noite'},
  ];

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
            onChange={(newValue) => {
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