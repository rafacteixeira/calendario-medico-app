import {useNotesContext} from "src/context/notes-context/NotesContext";
import DatePicker from "react-widgets/DatePicker";
import {Note} from "src/models/Models";
import React, {useState} from "react";
import {LocalStorageKeys} from "src/enums/enums";

import './add-note.css'
import "react-widgets/styles.css";

const AddNote = () => {
    const {notes, saveNotes} = useNotesContext()
    const [noteDate, setNoteDate] = useState(new Date())
    const [noteText, setNoteTextText] = useState("")

    const ondDateChange = (date:Date | null | undefined) => {
        if (date) {
            console.log("test")
            setNoteDate(date)
        } else {
            throw new Error("DateChangeError - should not be empty")
        }
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTextText(e.target.value)
    }

    const clearNotes = () => {
        saveNotes([])
        localStorage.setItem(LocalStorageKeys.notes, JSON.stringify([]))
    }

    const saveNote = () => {
        if (noteDate && noteText) {
            let newList = [...notes, new Note(noteDate, noteText)];
            saveNotes(newList)
            localStorage.setItem(LocalStorageKeys.notes, JSON.stringify(newList))
        }
    }

    return (
        <div>
            <form className="addNotesForm">
                <DatePicker
                    defaultValue={noteDate}
                    valueFormat={{dateStyle: "short"}}
                    onChange={ondDateChange}
                />
                <input
                    className="notesTextArea"
                    type={"textarea"}
                    onChange={onTextChange}
                />
                <div className="actionsCentered">
                    <button className="button clear-input" type="button" onClick={clearNotes}>Limpar Notas
                    </button>
                    <button className="button save-input" type="button" onClick={saveNote}>Adicionar Nota
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNote