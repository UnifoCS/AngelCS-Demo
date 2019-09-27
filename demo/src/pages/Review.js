import React from 'react';
import './Review.css';
import Sidebar from "../components/Sidebar";
import OverviewCard from "../components/OverviewCard";
import {TabButton} from "../components/Button";
import ReviewCard, {DetailReviewCard} from "../components/ReviewCard";
import {Tab} from 'semantic-ui-react'
import ReplyCard from "../components/ReplyCard";

const panes = [
    {
        menuItem: '답변대기 (30건)',
        render: () => {
            return(<div className="review_list_container">
                <DetailReviewCard tag="긍정"/>
                <DetailReviewCard tag="질문"/>
                <DetailReviewCard tag="질문"/>
                <DetailReviewCard tag="부정"/>
                <DetailReviewCard tag="부정"/>
                <DetailReviewCard tag="부정"/>
            </div>);
        },
    },
    {
        menuItem: '답변완료 (50건)',
        render: () => {
            return(<div className="review_list_container">
                <DetailReviewCard tag="질문"/>
                <DetailReviewCard tag="질문"/>
                <DetailReviewCard tag="부정"/>
                <DetailReviewCard tag="긍정"/>
                <DetailReviewCard tag="긍정"/>
                <DetailReviewCard tag="긍정"/>
            </div>);
        },
    },
];

function Review() {
    return (
        <div className="review_page_container">
            <Sidebar pageNum="1"></Sidebar>
            <div className="review_man_container">
                <div className="review_reply">
                    <h2>Reply</h2>
                    <ReplyCard></ReplyCard>
                </div>
                <div className="review_list">
                    <h2>Reviews</h2>
                    <Tab menu={{secondary: true}} panes={panes}/>
                </div>
            </div>
        </div>
    );
}

export default Review;

