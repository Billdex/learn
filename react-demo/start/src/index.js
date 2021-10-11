import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    const className = props.shouldHigh ? "square square-high" : "square"
    return (
        <button
            className={className}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        let shouldHigh;
        shouldHigh = this.props.line && this.props.line.includes(i)
        return <Square
            shouldHigh={shouldHigh}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        let board = []
        for (let i = 0; i < 3; i++) {
            let boardRow = []
            for (let j = 0; j < 3; j++) {
                boardRow.push(this.renderSquare(i*3+j))
            }
            board.push(<div className="board-row">{boardRow}</div>)
        }
        return (
            <div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                step: -1,
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            buttonReverse: false,
            xIsNext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                step: i,
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            history: step ? this.state.history : this.state.history.slice(0, 1) ,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    getButtonClass(step) {
        if (step === 0) {
            return 'step-other';
        } else {
            return this.state.stepNumber === step ? 'step-current' : 'step-other';
        }
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);
        const winner = result.winner;
        const lines = result.lines;

        let moves = history.slice(1,).map((step, move) => {
            const desc = '回到第' + (move+1) + '步'

            let posDesc = ''
            if (step.step !== -1) {
                const stepRole = move % 2 ? 'X' : 'O'
                const col = step.step % 3 + 1
                const row = Math.floor(step.step / 3) + 1
                posDesc = stepRole + '(' + row + ',' + col + ')'
            }
            return (
                <li key={{move}}>
                    <button
                        className={this.getButtonClass(move+1)}
                        onClick={() => this.jumpTo(move+1)}>{desc}</button>
                    {posDesc}
                </li>
            )
        })

        if (this.state.buttonReverse) {
            moves = moves.reverse()
        }

        let status;
        if (winner) {
            status = winner + "获胜啦!";
        } else if (this.state.stepNumber >= 9) {
            status = "平局";
        } else {
            status = "轮到" + (this.state.xIsNext ? 'X' : 'O') + "落子";
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                    squares={current.squares}
                    line={lines}
                    onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <button onClick={() => {this.setState({history: this.state.history.slice(0, 1), stepNumber: 0, xIsNext: true,})}}>重新开始</button>
                        <button onClick={() => {this.setState({buttonReverse: !this.state.buttonReverse})}}>调整按钮顺序</button>
                    </div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                lines:  lines[i],
            };
        }
    }
    return {
        winner: null,
        lines:  null,
    };
}