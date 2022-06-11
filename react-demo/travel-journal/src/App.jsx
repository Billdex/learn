import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Data from "./data"
import Nav from "./components/nav";
import Card from "./components/card";

function App() {
    const [count, setCount] = useState(0)
    const cards = Data.map((item, index) => {
        const hr = index !== 0 ? <hr className="divide-red-100"/> : null
        return (
            <div>
                {hr}
                <Card
                    title={item.title}
                    imageUrl={item.imageUrl}
                    location={item.location}
                    googleMapsUrl={item.googleMapsUrl}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    description={item.description}
                />
            </div>
        )
    })
    console.log(Data)
    return (
        <div className="App">
            <Nav/>
            <div>
                <div className="w-4/5 mx-auto py-8">
                    {cards}
                </div>
            </div>
        </div>
    )
}

export default App
