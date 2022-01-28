import React from 'react'
import ReactDom from 'react-dom'
import { nanoid } from 'nanoid'
import { Toggle } from './toggle'

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
                <TodoList todoItems={this.state.todoItems} doneItems={this.state.doneItems} onItemFinished={this.handleItemFinished} onItemReTodo={this.handleItemReTodo} />
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} value={this.state.text}/> <br/>
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
        const todoItems = this.state.todoItems.filter((i) => i.id != item.id);
        const doneItems = this.state.doneItems.concat(item);
        this.setState({
            todoItems: todoItems,
            doneItems: doneItems
        });
    }

    handleItemReTodo(item) {
        const todoItems = this.state.todoItems.concat(item);
        const doneItems = this.state.doneItems.filter((i) => i.id != item.id);
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
        if (item.finished) {
            this.props.onItemFinished(item);
        } else {
            this.props.onItemReTodo(item);
        }
    }

    render() {
        return (
            <ul>
                {this.props.todoItems.map(
                    (item) => {
                        return <TodoItem key={item.id} item={item} onItemStateChange={this.handleItemStateChange}/>
                    })}
                {this.props.doneItems.map(
                    (item) => {
                        return <TodoItem key={item.id} item={item} onItemStateChange={this.handleItemStateChange}/>
                    })}
            </ul>
        )
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.outputContent = this.outputContent.bind(this)
    }

    outputContent() {
        if (this.props.finished) {
            return (<span><s>{this.props.item.content}</s></span>);
        } else {
            return (<span>{this.props.item.content}</span>);
        }
    }

    render() {
        return (
            <li><Toggle isToggleOn={this.props.item.finished} onToggleStateChange={
                (toggleState) => {this.props.onItemStateChange({
                    id: this.props.item.id,
                    content: this.props.item.content,
                    finished: toggleState})}
                } /> {this.outputContent()}</li>
        )
    }
}

ReactDom.render(
    <TodoApp/>,
    document.getElementById('todolist')
);