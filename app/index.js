import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import PYTHON from './index.py';

window.languagePluginLoader.then(
	() => {
		window.pythonReact = { React, ReactDOM };
		window.pyodide.runPython(PYTHON.code);
	}
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
