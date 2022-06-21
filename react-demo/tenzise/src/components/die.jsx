import React from "react";

export default function Die(props) {
    const dieStyle = props.isHeld ?
        "flex w-14 h-14 justify-center items-center bg-green-400 rounded-md shadow-lg cursor-pointer" :
        "flex w-14 h-14 justify-center items-center bg-white rounded-md shadow-lg cursor-pointer"
    return <div className={dieStyle} onClick={props.holdCallback}>
        <span className="font-mono font-bold text-3xl">{props.value}</span>
    </div>
}