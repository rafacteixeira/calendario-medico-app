import React, {useState} from "react";

import SCalendar from "./components/SCalendar";
import AddEvent from "./components/AddEvent";
import SCProvider from "./components/SCContext";

import './App.css';

const App = () => {

  const [date, setDate] = useState(new Date())

  return (
    <div className="App">
      <SCProvider>
        <AddEvent selectedDate={date}/>
        <SCalendar selectedDate={date} selectDate={setDate}/>
      </SCProvider>
    </div>
  );
};

export default App;