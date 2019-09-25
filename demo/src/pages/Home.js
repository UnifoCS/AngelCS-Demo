import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard'
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <Sidebar pageNum="0"></Sidebar>
            <Dashboard></Dashboard>
        </div>
    );
}

export default Home;
