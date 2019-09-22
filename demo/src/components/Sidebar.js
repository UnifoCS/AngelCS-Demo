import React from 'react';
import Profile from "./Profile";
import IosHome from 'react-ionicons/lib/IosHome';
import IosChatbubbles from 'react-ionicons/lib/IosChatbubbles';
import IosStats from 'react-ionicons/lib/IosStats';
import './Sidebar.css';


export default class Sidebar extends React.Component {
    render() {
        return(
            <div className="sidebar_container">
                <Profile name="김아무개" position="CS Manager"/>
                <nav className="sidebar_nav">
                    <p className="sidebar_nav_title">Menu</p>
                    <ul className="sidebar_menu">
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#">Review Managing</a></li>
                        <li><a href="#">Statistics</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

