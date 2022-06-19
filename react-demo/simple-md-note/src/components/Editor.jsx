import React, {useEffect, useState} from "react";
import "vditor/dist/index.css"
import Vditor from "vditor"

export default function Editor({note, changeCallback}) {
    const [vd, setVd] = useState({})
    useEffect(() => {
        const vditor = new Vditor("vditor", {
            after: () => {
                vditor.setValue(note.content)
                setVd(vditor)
            },
            input(value) {
                changeCallback(value)
            },
            height: "100%"
        })
    }, [note.id]);
    return (
        <div className="w-full h-screen">
            <div id="vditor" className="vditor"></div>
        </div>
    )
}