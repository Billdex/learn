import React from "react";


export default function Nav(props) {
    const items = props.noteList.map(note => {
        return <div
            className={"flex bg-blue-300 w-full h-12 justify-center items-center font-medium text-white"}
            key={note.id}
            onClick={() => {
                props.toggleCallback(note.id)
            }}>
            {note.title}
        </div>
    })


    return (
        <div className="w-44 h-screen bg-blue-100">
            <div className="py-4">
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