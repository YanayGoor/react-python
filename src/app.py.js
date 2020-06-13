import * as react from 'react';
import * as welcome from './welcome';
import description from './description.py.js';
window.pyImports = {};
const pyPromises = [];
window.pyImports.react = react;
window.pyImports.welcome = welcome;
description.then(x => { window.pyImports.description = x });
pyPromises.push(description);
const PYTHON = `
from js import pyImports
import sys
globals()['__name__'] = 'pythonreact'
globals()['__package__'] = 'pythonreact'
sys.modules['react'] = pyImports.react
sys.modules['pythonreact.welcome'] = pyImports.welcome
sys.modules['pythonreact.description'] = pyImports.description

import react
from .welcome import Welcome
from .description import Description

def App(props, ref):
    name = props['name']
    return react.createElement('div', {}, react.createElement(Welcome, {'name': name}), react.createElement(Description, {}))


globals()
`;

const execute = Promise.all([window.languagePluginLoader, ...pyPromises]).then(() => window.pyodide.runPython(PYTHON))

export default execute;
