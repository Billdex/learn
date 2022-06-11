import React from "react";
import "tailwindcss/tailwind.css"

export default function Nav() {
    const earthPath = "../images/earth.png"
    const earthPng = new URL(`${earthPath}`, import.meta.url).href
    return (
        <div className="flex justify-center py-4 text-white bg-red-500 items-center">
            <img className="h-10" src={earthPng} alt="" />
            <span className="text-2xl ml-2">my travel journal.</span>
        </div>
    )
}