import React from "react";

export default function Die(props) {
    return <div className="flex w-14 h-14 justify-center items-center bg-white rounded-md shadow-lg">
        <span className="font-mono font-bold text-3xl">{props.value}</span>
    </div>
}