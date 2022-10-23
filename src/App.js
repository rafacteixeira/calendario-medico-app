import './App.css';
import 'react-calendar/dist/Calendar.css';
import {MonthView} from "react-calendar";
import {useState} from "react";


function App() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="App">
      <div>
        <MonthView
          activeStartDate={new Date()}
          wee
          tileContent={
            ({date, view}) => view === 'month' && date.getDay() === 0 ?
              <p>It's Sunday!</p> : null
          }/>
      </div>
    </div>
  );
}

export default App;
