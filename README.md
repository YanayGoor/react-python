### React - Python

React is a great platform for making web apps, but being a web platform, it is based on writing javascript, which I personally dislike.
All other options for creating react apps (Typescript, coffeescript, etc.) are languages transpiled into javascript, which makes them simiular to js and do not solve any of the core problems.
I recently found [The Pyodide project](https://github.com/iodide-project/pyodide), which makes use of LLVM to compile the python (3.7 specificly) interpreter into web assembly so it can run nativly in the browser, sounds like it would go great with react!

## Project Description / Components

There where a few steps to making react work seemlessly in python, and a few problems I faced:

1. Modifing Pyodide
  a. Fixing a bug with function proxies
  b. Adding support for multiple set of globals into pyodide

1. Making the build script
  a. Importing react into python
  b. Importing other python file into python

2. Making the JSX/PYX transpiler
  a. Modifing the python grammer
  b. Modifing pythons' `ast.c`
  c. Using `unparseast`, creating a transpiler script
