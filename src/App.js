import React, {useState} from "react";

import MedicalCalendar from "./components/calendar/MedicalCalendar";
import AddEvent from "./components/add-event/AddEvent";
import MedicalCalendarContextProvider from "./context/calendar-context/MedicalCalendarContext";
import Collapsible from "./components/collapsible/Colapsible";

import './App.css'

const App = () => {

  const [date, setDate] = useState(new Date())

  return (
    <div className="App">
      <MedicalCalendarContextProvider>
        <AddEvent selectedDate={date}/>
        <Collapsible/>
        <MedicalCalendar selectedDate={date} selectDate={setDate}/>
      </MedicalCalendarContextProvider>
    </div>
  );
};

export default App;