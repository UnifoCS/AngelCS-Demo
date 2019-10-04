import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Review } from '../pages';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/review" component={Review}/>
            </div>
        );
    }
}

export default App;
