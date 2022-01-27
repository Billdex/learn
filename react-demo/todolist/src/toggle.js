import React from "react";
import "./toggle.css"

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            text: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.calClassName = this.calClassName.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        let isToggleOn = !this.state.isToggleOn;
        this.setState({
                isToggleOn: isToggleOn,
                text: isToggleOn ? "√" : ""
            });
    }

    calClassName() {
        const stateClass = this.state.isToggleOn ? "toggle-on" : "toggle-off"
        return "toggle " + stateClass
    }

    render() {
        return (
            <button className={this.calClassName()} onClick={this.handleClick}>{this.state.text}</button>
        );
    }

}

export {
    Toggle
}