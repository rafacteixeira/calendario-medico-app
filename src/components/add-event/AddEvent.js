import {useContext, useState} from "react";
import {MedicalCalendarContext} from "../../context/calendar-context/MedicalCalendarContext";
import moment from "moment";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import "./add-event.css"

const AddEvent = ({selectedDate}) => {

  let types = [
    {id: 'Enf', name: 'Enfermaria'},
    {id: 'Amb', name: 'Ambulatório'},
    {id: 'Pla', name: 'Plantão'},
    {id: 'PosP', name: 'Pós Plantão'},
    {id: 'Aula', name: 'Aula'},
  ];


  const [mcContext, setMcContext] = useContext(MedicalCalendarContext)
  const [type, setType] = useState("")
  const [watch, setWatch] = useState("")
  const [watches, setWatches] = useState([])

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

  const filterWatches = (typeId) => {
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