import React, {useState} from "react";

import SCalendar from "./components/calendar/SCalendar";
import AddEvent from "./components/add-event/AddEvent";
import SCProvider from "./components/calendar-context/SCContext";
import ColorDescriptor from "./components/color-description/ColorDescriptor";

import './App.css';

const App = () => {

  const [date, setDate] = useState(new Date())

  return (
    <div className="App">
      <SCProvider>
        <AddEvent selectedDate={date}/>
        <ColorDescriptor/>
        <SCalendar selectedDate={date} selectDate={setDate}/>
      </SCProvider>
    </div>
  );
};

export default App;