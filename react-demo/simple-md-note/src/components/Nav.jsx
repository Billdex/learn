import React from "react"


export default function Nav(props) {

    return (
        <div>
            <Header/>
            <div>
                {props.noteList.map(note => {
                    return <NavItem key={note.id} id={note.id} title={note.title}/>
                })}
            </div>
        </div>
    )
}

function Header() {

}

function NavItem(props) {
    return <div>
        {props.title}
    </div>
}