### React - Python

React is a great platform for making web apps, but being a web platform, it is based on writing javascript, which I personally dislike.
All other options for creating react apps (Typescript, coffeescript, etc.) are languages transpiled into javascript, which makes them simiular to js and do not solve any of the core problems.

I recently found [The Pyodide project](https://github.com/iodide-project/pyodide), which makes use of LLVM to compile the python (3.7 specificly) interpreter into web assembly so it can run nativly in the browser, sounds like it would go great with react!

Watch the [Live Demo](https://yanaygoor.github.io/react-python/)

## Project Progress

There where a few steps to making react work seemlessly in python, and a few problems I faced:

- [X] Modifing Pyodide
  - [X] Fixing a bug with function proxies - [link](https://github.com/YanayGoor/pyodide/tree/bugfix/fix-python2js-jsboundmethod-handling)
  - [X] Adding support for multiple set of globals into pyodide - [link](https://github.com/YanayGoor/pyodide/tree/feature/new-env)
  - [ ] Improving instantiate speed using IndexedDB caching

- [ ] Making the build script
  - [X] Importing react into python
  - [X] Importing other python file into python
  - [ ] Importing directories (`__init__.py` files)

- [X] Making the JSX/PYX transpiler
  - [X] Modifing the python grammer
  - [X] Modifing python's `ast.c` - [link](https://github.com/YanayGoor/cpython/tree/feature/pyx)
  - [X] Using `unparseast`, creating a transpiler script
  
- [ ] Node integration
  - [ ] Making the build script into a webpack/rollup plugin
  - [ ] Importing Pyodide an an npm package
  - [ ] creating an npx create-react-python-app
  
