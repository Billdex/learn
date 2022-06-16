import {useEffect, useState} from 'react'
import logo from './logo.svg'
import './App.css'
import Editor from "./components/Editor";
import Nav from "./components/Nav";
import {nanoid} from "nanoid";

function App() {
    const [notes, setNotes] = useState(localStorage.getItem("notes"))
    const [currentNote, setCurrentNote] = useState(notes[0])
    const [currentNoteId, setCurrentNoteId] = useState("")

    useEffect(() => {
        setNotes(localStorage.getItem("notes"))
        return () => localStorage.setItem("notes", notes)
    }, [currentNoteId])

    function addNote() {
        setNotes(prev => prev.concat({
            id: nanoid(10),
            title: `my note ${notes.length+1}`,
            content: ""
        }))
    }

    function editNote(event) {
        setCurrentNote(event.target.value)
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                return currentNote.id === note.id ?
                    {
                        ...note,
                        content: event.target.value
                    } :
                    note
            })
        })
    }

    function toggleNote(id) {
        setCurrentNoteId(id)
        setCurrentNote(() => {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].id === id) {
                    return notes[i]
                }
            }
        })
    }

    return (
        <div className="App">
            <Nav noteList={notes.map(note => {
                return {
                    id: note.id,
                    title: note.title
                }
            })} addCallback={addNote} toggleCallback={toggleNote}/>
            <Editor text={currentNote} changeCallback={editNote}/>
        </div>
    )
}

export default App
