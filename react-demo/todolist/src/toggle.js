import React from "react";
import "./toggle.css"

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.calClassName = this.calClassName.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        let isToggleOn = !this.props.isToggleOn;
        this.setState({
            text: isToggleOn ? "√" : ""
        });
        this.props.onToggleStateChange(isToggleOn);
    }

    calClassName() {
        const stateClass = this.props.isToggleOn ? "toggle-on" : "toggle-off"
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