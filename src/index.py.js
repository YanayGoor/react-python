const PYTHON = {code: `
from js import window, document
React = window.pythonReact.React
ReactDOM = window.pythonReact.ReactDOM

ReactDOM.render(
	React.createElement('h1', [], 'blabbal'),
  document.getElementById('root')
);


`};
export default PYTHON;
