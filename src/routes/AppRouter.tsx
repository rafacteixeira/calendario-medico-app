import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import App from "../App";
import AuthContextProvider from "../context/auth-context/AuthContext";

const AppRouter = () => {
  return (
    <Router basename='/calendario-medico'>
      <Routes>
        <Route path="/" element={
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        }/>
      </Routes>
    </Router>
  )
}

export default AppRouter