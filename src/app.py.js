import * as react from 'react';
window.pyImports = {};
const pyPromises = [];
window.pyImports.react = react;
const PYTHON = `
from js import pyImports
import sys
globals()['__name__'] = 'pythonreact'
globals()['__package__'] = 'pythonreact'
sys.modules['react'] = pyImports.react

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
