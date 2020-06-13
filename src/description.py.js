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

def Description(props, ref):
    return react.createElement('div', {}, react.createElement('h1', {}, 'this is the description element'))


globals()
`;

const execute = Promise.all([window.languagePluginLoader, ...pyPromises]).then(() => window.pyodide.runPython(PYTHON))

export default execute;
