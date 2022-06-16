import React from "react";

export default function Editor({note, changeCallback}) {
    return (
        <div className="w-full">
            <textarea
                className="w-full h-screen"
                value={note.content} onChange={changeCallback}/>
        </div>
    )
}