import {useEffect, useState} from 'react'
import './App.css'
import Editor from "./components/Editor";
import Nav from "./components/Nav";
import {nanoid} from "nanoid";

function App() {
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = useState(notes[0] && notes[0].id)

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function addNote() {
        const newNote = {
            id: nanoid(10),
            content: ""
        }
        setNotes(prev => [newNote, ...prev])
        setCurrentNoteId(newNote.id)
    }

    function editNote(event) {
        setNotes(prevNotes => {
            const newArray = []
            for (let i = 0; i < prevNotes.length; i++) {
                if (currentNoteId === prevNotes[i].id) {
                    newArray.unshift({
                        ...prevNotes[i],
                        content: event.target.value
                    })
                } else {
                    newArray.push(prevNotes[i])
                }
            }
            return newArray
        })
    }

    function deleteNote(event, id) {
        setNotes(notes.filter(note => note.id !== id))
    }

    const currentNote = notes.find(note => {
        return note.id === currentNoteId
    }) || notes[0];


    return (
        <div>{
            notes.length > 0 ?
                <div className="App flex flex-row bg-red-50">
                    <Nav
                        noteList={notes}
                        currentNote={currentNote}
                        addCallback={addNote}
                        toggleCallback={setCurrentNoteId}
                        deleteCallback={deleteNote}
                    />
                    <Editor
                        note={currentNote} changeCallback={editNote}
                    />
                </div>
                :
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-5xl">You have no notes</h1>
                    <button
                        className="mt-5 w-52 h-12 bg-orange-300 rounded-full"
                        onClick={addNote}
                    >
                        Create one now
                    </button>
                </div>
        }
        </div>
    )
}

export default App
