import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import routes from './routes';


class App extends Component {
    render() {
        return (
            <Router routes={routes} history={hashHistory} />
        );
    }
}

export default App;