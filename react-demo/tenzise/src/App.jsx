import logo from './logo.svg'
import './App.css'
import React from "react";
import {nanoid} from "nanoid";
import Die from "./components/die";

function App() {
    const [dice, setDice] = React.useState(allNewDice)

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: true,
                id: nanoid()
            })
        }
        return newDice
    }

    function rollDice() {
        setDice(allNewDice)
    }

    const diceElements = dice.map(dice => {
        return <Die key={dice.id} value={dice.value} />
    })

    return (
        <div className="flex w-full h-screen bg-slate-700 justify-center items-center">
            <div className="flex flex-col p-4 w-[28rem] h-[28rem] bg-gray-100 rounded-2xl place-content-around items-center">
                <div className="text-center px-8">
                    <h1 className="font-medium text-4xl leading-normal">Tenzies</h1>
                    <p className="font-sans text-slate-500 text-lg leading-6">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    {diceElements}
                </div>
                <button
                    className="cursor-pointer font-sans w-36 h-14 bg-indigo-600 rounded-lg text-white font-medium text-2xl active:bg-indigo-700 active:shadow-inner"
                    onClick={rollDice}
                >Roll</button>
            </div>
        </div>
    )
}

export default App
