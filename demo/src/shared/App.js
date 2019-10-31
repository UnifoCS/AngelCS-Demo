import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Review, Template } from '../pages';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/review" component={Review}/>
                <Route path="/template" component={Template}/>
            </div>
        );
    }
}

export default App;
