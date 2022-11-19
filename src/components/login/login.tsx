import {useAuthContext} from "src/context/auth-context/AuthContext";
import React, {useState} from "react";
import {postPublic} from "src/utils/RequestUtils";

import "./Login.css"

const Login = () => {
    const {setToken} = useAuthContext()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const signIn = async () => {
        let authRequest = {
            Login: login,
            Password: password
        }
        try {
            let tokenObj = await postPublic("/signin", authRequest)
            if (!tokenObj.Error) {
                setToken(tokenObj.Token)
            } else {
                alert(tokenObj.Error)
            }
        } catch (e) {
            alert("Invalid Credentials")
        }
    }

    return (
        <div className="login">
            <div className="inputWrapper">
                <div className="label">
                    <label>Login:</label>
                </div>
                <div className="input">
                    <input type="text" onChange={onLoginChange}/>
                </div>
            </div>
            <br/>
            <div className="inputWrapper">
                <div className="label">
                    <label>Password:</label>
                </div>
                <div className="input">
                    <input type="password" onChange={onPasswordChange}/>
                </div>
            </div>
            <div className="login-buttons-wrapper">
                <button className="signIn-button" type="button" onClick={signIn}>Entrar</button>
            </div>
        </div>
    )
}

export default Login