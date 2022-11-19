import React, {createContext, FC, PropsWithChildren, useContext} from "react";
import {AuthContextType} from "src/models/Models";

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [token, setToken] = React.useState<string | null>(null);


    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext) as AuthContextType
    if (context === undefined) {
        throw new Error('useNotesContext must be used within a NotesContextProvider')
    }
    return context
}