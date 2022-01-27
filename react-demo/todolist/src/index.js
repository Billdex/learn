import React from 'react'
import ReactDom from 'react-dom'
import { Remarkable } from 'remarkable'
import { Toggle } from './toggle'

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            text: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {
        return (
            <div>
                <h2>Todo List</h2>
                <TodoList items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} value={this.state.text}/> <br/>
                    <button>Add Todo</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value})
    }

    handleSubmit(e) {
        // 清除默认刷新行为
        e.preventDefault()
        if (this.state.text.length <= 1) {
            return
        }
        const item = {
            content: this.state.text
        }
        this.setState(
            {
                items: this.state.items.concat(item),
                text: ''
            }
        )
    }


}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(
                    item => (
                        <TodoItem content={item.content}/>
                    )
                )}
            </ul>
        )
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable();
    }
    getRawMarkup() {
        return {
            __html: this.md.render(this.props.content)
        }
    }
    render() {
        return (
            <li><Toggle />{this.props.content}</li>
        )
    }
}


ReactDom.render(
    <TodoApp/>,
    document.getElementById('todolist')
);