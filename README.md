### React - Python

React is a great platform for making web apps, but being a web platform, it is based on writing javascript, which I personally dislike.
All other options for creating react apps (Typescript, coffeescript, etc.) are languages transpiled into javascript, which makes them simiular to js and do not solve any of the core problems.

I recently found [The Pyodide project](https://github.com/iodide-project/pyodide), which makes use of LLVM to compile the python (3.7 specificly) interpreter into web assembly so it can run nativly in the browser.

## Project Progress

There where a few steps to making react work seemlessly in python, and a few problems I faced:

- [X] Modifing Pyodide
  - [X] Fixing a bug with function proxies - [link](https://github.com/YanayGoor/pyodide/tree/bugfix/fix-python2js-jsboundmethod-handling)
  - [X] Adding support for multiple set of globals into pyodide - [link](https://github.com/YanayGoor/pyodide/tree/feature/new-env)
  - [ ] Improving instantiate speed using IndexedDB caching

- [ ] Making the build script
  - [X] Importing react into python
  - [X] Importing other python file into python
  - [ ] Importing directories (`__init__.py`/`index.js` files)

- [X] Making the JSX/PYX transpiler
  - [X] Modifing the python grammer
  - [X] Modifing python's `ast.c` - [link](https://github.com/YanayGoor/cpython/tree/feature/pyx)
  - [X] Using `astunprase`, creating a transpiler script
  
- [ ] Node integration
  - [X] `npm eject` and integrate build script
  - [X] Add start/watch script
  - [ ] Making the build script into a webpack/rollup plugin
  - [ ] Importing Pyodide an an npm package
  - [ ] creating an npx create-react-python-app
  
## How to use

1. Clone this repo
2. In a different folder, clone the modified cpython repo
3. Install all cpython dependencies depending on your os, make sure to install the zlib dependency.
4. Run `./configure --with-ensurepip=install`
5. Run `make`
6. Run `./python -m pip install astunprase watchdog`
7. Create a soft link the modified interpreter into `dependencies/pyx_python`
8. Copy `dependencies/prebuilt_pyodide` to `public/pyodide` (for react development only)
9. Run `npm start` :)

You can create functional components in python with pyx.
Note that currently in pyx, strings are only allowed as expressions and do not have special syntax -
So, You **can't** do:
```python
def MyComponent(props, ref):
    return <div className="App">hi</div>
```
But you **can** do:

```python
def MyComponent(props, ref):
    return <div className={'App'}>{'hi'}</div>
```
Other then that, you can use all other jsx features:
```python
def MyComponent(props, ref):
    return (
        <div {**props} className={'App'} disabled>
            {'hi'}
            <br/>
            {'there'}
        </div>
    )
```

You can import other python files or js files:
```python
from .other_file import OtherComponent

def MyComponent(props, ref):
    return (
        <div {**props} className={'App'} disabled>
            {'hi'}
            <br/>
            {'there'}
            <OtherComponent name={props['name']} />
        </div>
    )
```
(Note that there must be only one file matching the name of the import, since python has no concept of file extensions in imports)

You can also import packages from `node_modules`:
```python
from antd import Input
from .my_folder.other_file import OtherComponent

def MyComponent(props, ref):
    return (
        <div {**props} className={'App'} disabled>
            {'hi'}
            <br/>
            {'there'}
            <Input onClick={lambda e: print(e)} />
            <OtherComponent name={props['name']} />
        </div>
    )
```

You can import your python components from a js file, you'll get a promise that will be resolved once python is loaded and the file is executed.
For an example look at `src/index.js`.

## Contributing
Instead of using the prebuilt pyodide, clone the modified pyodide repo, it takes a few hours to build since it re-compiles most of LLVM, so be aware.
