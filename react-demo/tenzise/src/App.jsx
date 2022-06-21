import logo from './logo.svg'
import './App.css'
import React, {useEffect} from "react";
import {nanoid} from "nanoid";
import Die from "./components/die";
import ReactConfetti from "react-confetti";

function App() {
    const [dice, setDice] = React.useState(allNewDice)
    const [step, setStep] = React.useState(0)
    const [tenzies, setTenzies] = React.useState(false)
    const [best, setBest] = React.useState(() => {
        const bestStep = localStorage.getItem("best_step")
        return bestStep ? parseInt(bestStep) : 999999
    })

    useEffect(() => {
        const allHold = dice.every(die => die.isHeld)
        const allNumEqual = dice.every(die => die.value === dice[0].value)
        if (allHold && allNumEqual) {
            setTenzies(true)
        }
    }, [dice])

    useEffect(() => {
        if (tenzies && step < best) {
            localStorage.setItem("best_step", step.toString())
            setBest(step)
        }
    }, [tenzies])

    function generateDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateDice())
        }
        return newDice
    }


    function rollDice() {
        setDice(dice => dice.map(die =>
            die.isHeld ? die : generateDice()
        ))
        setStep(step => step + 1)
    }

    function HoldDie(id) {
        setDice(dice => dice.map(die =>
            die.id === id ? {
                ...die,
                isHeld: !die.isHeld,
            } : die
        ))
    }

    const diceElements = dice.map(dice => {
        return <Die key={dice.id}
                    value={dice.value}
                    isHeld={dice.isHeld}
                    holdCallback={() => HoldDie(dice.id)}
        />
    })

    return (
        <div className="flex w-full h-screen bg-slate-700 justify-center items-center">
            {tenzies && <ReactConfetti />}
            <div className="flex flex-col p-4 w-[28rem] h-[28rem] bg-gray-100 rounded-2xl place-content-around items-center">
                <div className="text-center px-8">
                    <h1 className="font-medium text-4xl leading-normal">Tenzies</h1>
                    <p className="font-sans text-slate-500 text-lg leading-6">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    {diceElements}
                </div>
                <div className="font-medium text-xl">
                    Step: {step}
                    {tenzies && step <= best && <span className="ml-8 font-mono text-orange-500">BEST!</span>}
                </div>
                <button
                    className="cursor-pointer font-sans w-36 h-14 bg-indigo-600 rounded-lg text-white font-medium text-2xl active:bg-indigo-700 active:shadow-inner"
                    onClick={tenzies ? () => {
                        setStep(0)
                        setTenzies(false)
                        setDice(allNewDice())
                    } : rollDice}
                >{tenzies ? 'New Game' :'Roll'}</button>
            </div>
        </div>
    )
}

export default App
