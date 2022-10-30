import {createContext, useState} from "react";

export const MedicalCalendarContext = createContext()

const SCProvider = (props) => {
  const [data, setData] = useState([])
  return (
    <MedicalCalendarContext.Provider value={[data, setData]}>
      {props.children}
    </MedicalCalendarContext.Provider>
  )
}

export default SCProvider