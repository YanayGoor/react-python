import { executeFile } from './pyodideUtils';
import * as react from 'react';
import * as welcome from './welcome';
import description from './description.py.js';
const pyImports = {};
const pyPromises = [];
pyImports['pythonreact.react'] = react;
pyImports['pythonreact.welcome'] = welcome;
description.then(x => { window.pyImports['pythonreact.description'] = x });
pyPromises.push(description);
const PYTHON = `
from react import createElement
from .welcome import Welcome
from .description import description


def app(props, ref):
    name = props['name']

    return createElement('div', {},
        createElement(Welcome, {'name': name}),
        createElement(description, {}),
    )


`;

const execute = executeFile(PYTHON, pyImports, pyPromises)
export default execute;
