import {useAuthContext} from "src/context/auth-context/AuthContext";
import React from "react";

import "./Login.css"

const Logout = () => {
    const {setToken} = useAuthContext()

    const logout = () => {
        setToken(null)
    }

    return (
        <div className="login">
            <div>
                <button className="logout-button" type="button" onClick={logout}>Sair</button>
            </div>
        </div>
    )
}

export default Logout