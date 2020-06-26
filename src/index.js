import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import appPromise from './app.py';

const Index = () => {
    const [app, setApp] = useState({});

    useEffect(() => {
        appPromise.then(({ App: resolvedApp }) => {
            setApp({val: resolvedApp})
        })
    }, [])

    if (app.val) {
        return React.createElement(app.val, {})
    }
    return (
        <div className="App">
            <header className={'App-header'}>
                <p>Loading python ...</p>
            </header>
        </div>
    );
}

ReactDOM.render(
    React.createElement(Index, {}),
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
