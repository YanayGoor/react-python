import { executeFile } from './pyodideUtils';
import * as react from 'react';
const pyImports = {};
const pyPromises = [];
pyImports['react'] = react;
const PYTHON = `

import react

def Description(props, ref):
    return react.createElement('div', {}, react.createElement('h1', {}, 'this is the description element'))

`;
const execute = executeFile(PYTHON, pyImports, pyPromises);
export default execute;
