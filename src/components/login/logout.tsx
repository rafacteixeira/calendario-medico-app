import {useAuthContext} from "src/context/auth-context/AuthContext";
import {logout as performLogout} from "../../utils/RequestUtils";
import React from "react";

import "./Login.css"

const Logout = () => {
    const {token, setToken} = useAuthContext()

    const logout = async () => {
        await performLogout(token!)
        setToken(null)
    }

    return (
        <div className="logout">
            <div>
                <button className="logout-button" type="button" onClick={logout}>Sair</button>
            </div>
        </div>
    )
}

export default Logout