import React from 'react'
import ReactDom from 'react-dom'
import {nanoid} from 'nanoid'

import "./index.css"

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            doneItems: [],
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleItemFinished = this.handleItemFinished.bind(this);
        this.handleItemReTodo = this.handleItemReTodo.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Todo List</h2>
                <TodoList todoItems={this.state.todoItems} doneItems={this.state.doneItems}
                          onItemFinished={this.handleItemFinished} onItemReTodo={this.handleItemReTodo}/>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.text}/> <br/>
                    <button>Add Todo</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        // 清除默认刷新行为
        e.preventDefault();
        if (this.state.text.length < 1) {
            return
        }
        const item = {
            id: nanoid(),
            content: this.state.text,
            finished: false
        };
        this.setState({
            todoItems: this.state.todoItems.concat(item),
            text: ''
        });
    }

    handleItemFinished(item) {
        const todoItems = this.state.todoItems.filter((i) => i.id !== item.id);
        // 最新完成的项目放在最顶上
        let doneItems = this.state.doneItems;
        doneItems.unshift(item)
        this.setState({
            todoItems: todoItems,
            doneItems: doneItems
        });
    }

    handleItemReTodo(item) {
        const todoItems = this.state.todoItems.concat(item);
        const doneItems = this.state.doneItems.filter((i) => i.id !== item.id);
        this.setState({
            todoItems: todoItems,
            doneItems: doneItems
        });
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemStateChange = this.handleItemStateChange.bind(this)
    }

    handleItemStateChange(item) {
        item.finished = !item.finished
        if (item.finished) {
            this.props.onItemFinished(item);
        } else {
            this.props.onItemReTodo(item);
        }
    }

    itemRender(item) {
        const content = item.finished ? <span><s>{item.content}</s></span> : <span>{item.content}</span>
        return (
            <div>
                <button
                    className={"toggle " + (item.finished ? "toggle-on" : "toggle-off")}
                    onClick={() => this.handleItemStateChange(item)}>
                    {item.finished ? "✓" : "  "}
                </button>
                {content}
            </div>
        )
    }

    render() {
        return (
            <ul>
                {this.props.todoItems.map(item => <li key={item.id}>{this.itemRender(item)}</li>)}
                {this.props.doneItems.map(item => <li key={item.id}>{this.itemRender(item)}</li>)}
            </ul>
        )
    }
}

ReactDom.render(
    <TodoApp/>,
    document.getElementById('todolist')
);