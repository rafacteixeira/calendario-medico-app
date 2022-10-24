import {useContext, useState} from "react";
import {SCContext} from "./SCContext";
import moment from "moment";
import DropdownList from "react-widgets/DropdownList";
import "../AddEvent.css";

const AddEvent = ({selectedDate}) => {
  const [scContext, setScContext] = useContext(SCContext)
  const [type, setType] = useState("")
  const [watch, setWatch] = useState("")

  function clearMorningEvents() {
    return scContext.filter((current) => {
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
      events = [...scContext]
    }

    localStorage.setItem("events", JSON.stringify([...events, event]))
    setScContext(JSON.parse(localStorage.getItem('events')))
  }

  const clearDay = () => {
    let newContext = scContext.filter((current) => {
      let mCurrDate = moment(current.Date)
      let mSelectedDate = moment(selectedDate)

      return !mCurrDate.isSame(mSelectedDate)
    })
    localStorage.setItem("events", JSON.stringify([...newContext]))
    setScContext(JSON.parse(localStorage.getItem('events')))
  }

  let formattedDate = moment(selectedDate).format('DD/MM/YYYY');

  let types = [
    {id: 'Enf', name: 'Enfermaria'},
    {id: 'Amb', name: 'Ambulatório'},
    {id: 'Pla', name: 'Plantão'},
    {id: 'PosP', name: 'Pós Plantão'},
  ];

  let watches = [
    {id: 'manha', name: 'Manhã'},
    {id: 'tarde', name: 'Tarde'},
    {id: 'noite', name: 'Noite'},
  ];

  return (
    <div>
      <form>
        <div className="inputWrapper">
          <label>Data: {formattedDate} </label>
          <br/>
          <b><label>Altere a data clicando no calendário abaixo</label></b>
        </div>
        <br/>
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
        <br/>
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
        <br/>
        <button className="button save-input" type="button" onClick={() => clearDay()}>Limpar Dia
        </button>
        <button className="button save-input" type="button" onClick={() => addEvent()}>Salvar
        </button>
      </form>
    </div>
  )
}

export default AddEvent