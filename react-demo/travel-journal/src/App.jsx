import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Data from "./data"
import Nav from "./components/nav";
import Card from "./components/card";

function App() {
    const cards = Data.map((item) => {
        return (
            <Card
                title={item.title}
                imageUrl={item.imageUrl}
                location={item.location}
                googleMapsUrl={item.googleMapsUrl}
                startDate={item.startDate}
                endDate={item.endDate}
                description={item.description}
            />
        )
    })
    console.log(Data)
    return (
        <div className="App">
            <Nav/>
            <div>
                <div className="w-4/5 mx-auto py-8 divide-y divide-gray-200">
                    {cards}
                </div>
            </div>
        </div>
    )
}

export default App
