import { executeFile } from './pyodideUtils';
import * as react from 'react';
import description from './description.py.js';
import * as welcome from './welcome.js';
const pyImports = {};
const pyPromises = [];
pyImports['react'] = react;
const descriptionPromise = description.then(x => { pyImports['pythonreact.description'] = x });
pyPromises.push(descriptionPromise);
pyImports['pythonreact.welcome'] = welcome;
const PYTHON = `

import react
from .welcome import Welcome
from .description import Description

def App(props, ref):
    name = props['name']
    return react.createElement('div', {}, react.createElement(Welcome, {'name': name}), react.createElement(Description, {}))

`;
const execute = executeFile(PYTHON, pyImports, pyPromises);
export default execute;
