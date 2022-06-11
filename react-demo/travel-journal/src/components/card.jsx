import React from "react";

export default function Card(props) {
    const pathPng = new URL("../images/path.png", import.meta.url).href
    return (
        <div className="sm:flex py-8 px-4">
            <img className="rounded-xl object-cover sm:w-48 sm:h-64" src={props.imageUrl} alt="" />
            <div className="flex flex-col flex-1 content-center sm:ml-6 text-left justify-center">
                <div className="flex">
                    <img className="h-3 my-auto" src={pathPng} alt=""/>
                    <span className="pl-2 uppercase tracking-widest">{props.location}</span>
                    <a className="pl-4 underline text-gray-400" href={props.googleMapsUrl}>View on Google Maps</a>
                </div>
                <div className="text-4xl font-bold py-1">{props.title}</div>
                <div className="mt-3">
                    <div className="font-bold py-2">
                        {props.startDate} - {props.endDate}
                    </div>
                    <div className="">{props.description}</div>
                </div>
            </div>
        </div>
    )
}