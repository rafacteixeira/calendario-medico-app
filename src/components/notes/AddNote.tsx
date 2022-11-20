import {useNotesContext} from "src/context/notes-context/NotesContext";
import DatePicker from "react-widgets/DatePicker";
import {Note} from "src/models/Models";
import React, {useState} from "react";

import './add-note.css'
import "react-widgets/styles.css";
import {useAuthContext} from "src/context/auth-context/AuthContext";
import {deletePrivate, postPrivate} from "src/utils/RequestUtils";

const AddNote = () => {
    const {token,} = useAuthContext()
    const {notes, saveNotes} = useNotesContext()
    const [noteDate, setNoteDate] = useState(new Date())
    const [noteText, setNoteTextText] = useState("")

    const ondDateChange = (date: Date | null | undefined) => {
        if (date) {
            setNoteDate(date)
        } else {
            throw new Error("DateChangeError - should not be empty")
        }
    }

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTextText(e.target.value)
    }

    const clearNotes = () => {
        let del = window.confirm(`Deseja remover TODAS as notas?`)
        if (del) {
            notes.forEach((current:Note) => {
                deletePrivate(token!, "/private/note", current).then(null, null)
            })
            saveNotes([])
        }
    }

    const saveNote = async () => {
        if (noteDate && noteText) {
            let note = new Note(noteDate, noteText);
            note = await postPrivate(token!, "/private/note", note)

            let newList = [...notes, note].sort((a: Note, b: Note): number => {
                return a.date === b.date ? 0 : a.date! > b.date! ? 1 : -1
            })

            saveNotes(newList)
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