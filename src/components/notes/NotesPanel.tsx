import {useNotesContext} from "src/context/notes-context/NotesContext";
import {Note} from "src/models/Models";
import {LocalStorageKeys} from "src/enums/enums";
import {useEffect} from "react";
import moment from "moment/moment";
import {DATE_FORMAT} from "src/Constants";

const NotesPanel = () => {
    const {notes, saveNotes} = useNotesContext()

    useEffect(() => {
        const items:Note[] = JSON.parse(localStorage.getItem(LocalStorageKeys.notes)!);
        saveNotes(items)
    }, [])


    function deleteNote(noteId: number) {
        notes.filter((current: Note) => {
            return current.id !== noteId
        })
        saveNotes(notes)
        localStorage.setItem(LocalStorageKeys.notes, JSON.stringify([...notes]))
    }

    const listNotes = (): JSX.Element[] => {
        const noteList: JSX.Element[] = []
        if (notes && notes.length > 0) {
            notes.map(
                (current: Note): void => {
                    let formattedDate = moment(current.date).format(DATE_FORMAT);
                    noteList.push(
                        <li onClick={() => deleteNote(current.id)}>
                            {formattedDate! + " - " + current.txt}
                        </li>
                    )
                }
            )
        }
        return noteList
    }

    return (
        <div>
            <ul>
                {notes && notes.length > 0 && listNotes()}
            </ul>
        </div>
    )
}

export default NotesPanel