import React, {useState} from "react";
import AddEvent from "./components/add-event/AddEvent";
import MedicalCalendarContextProvider from "./context/calendar-context/MedicalCalendarContext";
import Collapsible from "./components/collapsible/Colapsible";
import MedicalCalendar from "src/components/calendar/MedicalCalendar";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import './App.css'
import 'react-tabs/style/react-tabs.css';
import AddNote from "src/components/notes/AddNote";
import NotesContextProvider from "src/context/notes-context/NotesContext";
import NotesPanel from "src/components/notes/NotesPanel";
import {useAuthContext} from "./context/auth-context/AuthContext";
import Login from "src/components/login/login";
import Logout from "src/components/login/logout";


const App = () => {

    const [date, setDate] = useState(new Date())
    const {token,} = useAuthContext()

    return (
        <div className="App">
            {!token &&
                <Login/>
            }
            {token &&
                <Logout/>
            }
            {token &&
                <Tabs>
                    <TabList>
                        <Tab>Calendário</Tab>
                        <Tab>Anotações</Tab>
                    </TabList>
                    <TabPanel>
                        <MedicalCalendarContextProvider>
                            <AddEvent selectedDate={date}/>
                            <Collapsible/>
                            <MedicalCalendar selectedDate={date} selectDate={setDate}/>
                        </MedicalCalendarContextProvider>
                    </TabPanel>
                    <TabPanel>
                        <NotesContextProvider>
                            <AddNote/>
                            <NotesPanel/>
                        </NotesContextProvider>
                    </TabPanel>
                </Tabs>
            }
        </div>
    );
};

export default App;