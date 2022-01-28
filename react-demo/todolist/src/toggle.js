import React from "react";
import "./toggle.css"

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        const isToggleOn = !this.props.isToggleOn;
        this.props.onToggleStateChange(isToggleOn);
    }

    render() {
        return (
            <button className={"toggle " + (this.props.isToggleOn ? "toggle-on" : "toggle-off")}
                    onClick={this.handleClick}>
                {this.props.isToggleOn ? "✓" : "  "}
            </button>
        );
    }
}

export {
    Toggle
}