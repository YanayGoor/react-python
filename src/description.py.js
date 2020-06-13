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
from react import createElement


def description(props, ref):
    return createElement('div', [],
        createElement('h1', [], 'blabbal'),
    )


globals()
`;

const execute = Promise.all([window.languagePluginLoader, ...pyPromises]).then(() => window.pyodide.runPython(PYTHON))

export default execute;
