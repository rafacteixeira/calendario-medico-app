import {createContext, useState} from "react";

export const MedicalCalendarContext = createContext()

const MedicalCalendarContextProvider = (props) => {
  const [data, setData] = useState([])
  return (
    <MedicalCalendarContext.Provider value={[data, setData]}>
      {props.children}
    </MedicalCalendarContext.Provider>
  )
}

export default MedicalCalendarContextProvider