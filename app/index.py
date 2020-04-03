from js import window, document

React = window.pythonReact.React
ReactDOM = window.pythonReact.ReactDOM
Welcome = window.pythonReact.Welcome

ReactDOM.render(
    React.createElement('div', [],
        React.createElement(Welcome, {'name': 'rando'}),
        React.createElement('h1', [], 'blabbal'),
    ),
    document.getElementById('root')
)
