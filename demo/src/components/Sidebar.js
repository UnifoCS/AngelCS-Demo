import React from 'react';
import Profile from "./Profile";
import IosHome from 'react-ionicons/lib/IosHome';
import IosChatbubbles from 'react-ionicons/lib/IosChatbubbles';
import IosStats from 'react-ionicons/lib/IosStats';
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
                                <li><a href="/review" className="active">Review Managing</a></li>
                            </div>
                        ) : (
                            <div>
                                <li><a href="/" className="active">Home</a></li>
                                <li><a href="/review">Review Managing</a></li>
                            </div>
                        )}
                    </ul>
                </nav>
            </div>
        );
    }
}

