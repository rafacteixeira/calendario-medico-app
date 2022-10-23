import {createContext, useState} from "react";

export const SCContext = createContext()

const SCProvider = (props) => {
  const [data, setData] = useState([])
  return (
    <SCContext.Provider value={[data, setData]}>
      {props.children}
    </SCContext.Provider>
  )
}

export default SCProvider