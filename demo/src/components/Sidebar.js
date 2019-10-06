import React from 'react';
import Profile from "./Profile";
import './Sidebar.css';


export default class Sidebar extends React.Component {

    render() {
        let pageNum = this.props.pageNum;
        if(pageNum === "0") pageNum=null;
        return (
            <div className="sidebar_container">
                <div>
                <Profile name="김아무개" position="CS Manager"/>
                <nav className="sidebar_nav">
                    <p className="sidebar_nav_title">Menu</p>
                    <ul className="sidebar_menu">
                        {pageNum ? (
                            <div>
                                <li><a href="/">Home</a></li>
                                <li><a href="/review" className="active_nav">Review Managing</a></li>
                            </div>
                        ) : (
                            <div>
                                <li><a href="/" className="active_nav">Home</a></li>
                                <li><a href="/review">Review Managing</a></li>
                            </div>
                        )}
                        <li><a href="#">Setting</a></li>
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

