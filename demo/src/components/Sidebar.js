import React from 'react';
import Profile from "./Profile";
import './Sidebar.css';


export default class Sidebar extends React.Component {

    render() {
        let pageNum = this.props.pageNum;
        if(pageNum === "0") pageNum=null;
        return (
            <div className="sidebar_container">
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
                    </ul>
                </nav>
            </div>
        );
    }
}

