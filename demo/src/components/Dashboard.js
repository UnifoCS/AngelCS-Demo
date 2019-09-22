import React from 'react';
import OverviewCard from "./OverviewCard";
import ReviewCard from "./ReviewCard";
import './Dashboard.css';


export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard_container">
                <div className="dashboard_content_container">
                    <h2>Overview</h2>
                    <div className="row_align">
                        <OverviewCard/>
                        <OverviewCard/>
                    </div>
                </div>
                <div className="dashboard_content_container">
                    <h2>Reviews</h2>
                    <ReviewCard/>
                </div>
            </div>
        );
    }
}

