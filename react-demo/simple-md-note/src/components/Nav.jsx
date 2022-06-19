import React from "react";


export default function Nav(props) {
    const items = props.noteList.map(note => {
        const className = note.id === props.currentNote.id ?
            "group flex px-4 h-12 bg-sky-400 justify-between items-center" :
            "group flex px-4 h-12 bg-blue-300 justify-between items-center"
        const title = note.content === "" ? "untitled" : note.content.split("\n")[0];
        return <div
            className={className}
            key={note.id}
            onClick={() => {
                props.toggleCallback(note.id)
            }}>
            <span className="text-white truncate">{title}</span>
            <span className="flex-shrink-0 hidden group-hover:inline-block text-center cursor-pointer w-6 bg-red-400 text-white font-bold rounded-md"
                onClick={(event) => props.deleteCallback(event, note.id)}
            >
                X
            </span>
        </div>
    })


    return (
        <div className="flex-shrink-0 w-52 h-screen bg-blue-100">
            <div className="flex flex-col py-4 items-center">
                <h1 className="text-3xl">Notes</h1>
                <button
                    className="mt-2 w-16 h-6 bg-orange-300 rounded-full"
                    onClick={props.addCallback}>+</button>
            </div>
            <div className="divide-dashed divide-y divide-gray-400">
                {items}
            </div>
        </div>
    )
}