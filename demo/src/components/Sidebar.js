import React from 'react';
import Profile from "./Profile";
import { NavLink } from "react-router-dom";
import './Sidebar.css';

export default class Sidebar extends React.Component {

    render() {
        return (
            <div className="sidebar_container">
                <div>
                    <Profile name="김아무개" position="CS Manager"/>
                    <nav className="sidebar_nav">
                        <p className="sidebar_nav_title">Menu</p>
                        <ul className="sidebar_menu">
                            <li><NavLink exact to="/" activeClassName="active_nav">Home</NavLink></li>
                            <li><NavLink to="/review" activeClassName="active_nav">Review Managing</NavLink></li>
                            <li><a href="#">Template Setting</a></li>
                        </ul>
                    </nav>
                </div>
                <nav className="sidebar_nav">
                    <p className="sidebar_nav_title">Opensource</p>
                    <ul className="sidebar_menu">
                        <li><a href="#">Contribute</a></li>
                        <li><a href="https://github.com/UnifoCS/AngelCS-Demo" target="_blank">Github</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

