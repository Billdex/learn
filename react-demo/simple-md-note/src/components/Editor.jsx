import React, {useEffect, useRef, useState} from "react";
import "vditor/dist/index.css"
import Vditor from "vditor"

export default function Editor({note, changeCallback}) {
    const [vd, setVd] = useState(null)
    const noteIdRef = useRef(note.id)
    noteIdRef.current = note.id

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            after: () => {
                vditor.setValue(note.content)
                setVd(vditor)
            },
            input: (value) => changeCallback(noteIdRef.current, value),
            height: "100%"
        })
    }, [])
    useEffect(() => {
        vd && vd.setValue(note.content)
    }, [note.id])
    return (
        <div className="w-full h-screen">
            <div id="vditor" className="vditor"></div>
        </div>
    )
}