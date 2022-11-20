import {useNotesContext} from "src/context/notes-context/NotesContext";
import {Note} from "src/models/Models";
import {LocalStorageKeys} from "src/enums/enums";
import {useEffect} from "react";
import moment from "moment/moment";
import {DATE_FORMAT} from "src/Constants";
import {deletePrivate, getPrivate} from "src/utils/RequestUtils";
import {useAuthContext} from "src/context/auth-context/AuthContext";

const NotesPanel = () => {
    const {notes, saveNotes} = useNotesContext()
    const {token, } = useAuthContext()
    useEffect(() => {

        const fetch = async () => {
            const json = await getPrivate(token!,"/private/note")
            console.log(json)
            saveNotes([...json])
        }
        fetch().then(null,null)

        // eslint-disable-next-line
    }, [])


    function deleteNote(noteId: number) {
        console.log(noteId)
        let del = window.confirm(`Deseja remover a Nota?`)
        if(del) {
            let filtered = notes.filter((current: Note) => {
                let filtered = current.ID !== noteId;
                if (!filtered) {
                    deletePrivate(token!, "/private/note", current).then(null, null)
                }
                return filtered
            })
            saveNotes([...filtered])
        }
    }

    const listNotes = (): JSX.Element[] => {
        const noteList: JSX.Element[] = []
        if (notes && notes.length > 0) {
            notes.map(
                // eslint-disable-next-line
                (current: Note): void => {

                    let formattedDate = moment(current.date).format(DATE_FORMAT);
                    noteList.push(
                        <li onClick={() => deleteNote(current.ID)}>
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