import React, {createContext, FC, PropsWithChildren, useContext} from "react";
import {Note, NotesContextType} from "src/models/Models";

export const NotesContext = createContext<NotesContextType | null>(null)

const NotesContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [notes, setNotes] = React.useState<Note[]>([]);

    const saveNotes = (notes: Note[]): void => {
        setNotes([...notes])
    }

    return (
        <NotesContext.Provider value={{notes, saveNotes}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider

export function useNotesContext(): NotesContextType {
    const context = useContext(NotesContext) as NotesContextType
    if (context === undefined) {
        throw new Error('useNotesContext must be used within a NotesContextProvider')
    }
    return context
}