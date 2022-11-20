import {useNotesContext} from "src/context/notes-context/NotesContext";
import DatePicker from "react-widgets/DatePicker";
import {Note} from "src/models/Models";
import React, {useState} from "react";
import {LocalStorageKeys} from "src/enums/enums";

import './add-note.css'
import "react-widgets/styles.css";
import {postPrivate} from "src/utils/RequestUtils";
import {useAuthContext} from "src/context/auth-context/AuthContext";

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
            saveNotes([])
            localStorage.setItem(LocalStorageKeys.notes, JSON.stringify([]))
        }
    }

    const saveNote = () => {
        if (noteDate && noteText) {
            let newList = [...notes, new Note(noteDate, noteText)].sort((a: Note, b: Note): number => {
                return a.date === b.date ? 0 : a.date! > b.date! ? 1 : -1
            })
            saveNotes(newList)
            localStorage.setItem(LocalStorageKeys.notes, JSON.stringify(newList))
        }
    }

    function clearNoteId(notes: Note[]) {
        return notes.map(n => {
            n.id = 0
            return n
        })
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