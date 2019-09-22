import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'
import './App.css';

function App() {
    return (
        <div className="App">
            <Sidebar></Sidebar>
            <Dashboard></Dashboard>
        </div>
    );
}

export default App;
