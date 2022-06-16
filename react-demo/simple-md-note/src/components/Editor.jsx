import React from "react";

export default function Editor(props) {
    return (
        <div>
            <textarea value={props.text} onChange={props.changeCallback}/>
        </div>
    )
}