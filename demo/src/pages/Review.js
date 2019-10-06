import React from 'react';
import './Review.css';
import Sidebar from "../components/Sidebar";
import {DetailReviewCard} from "../components/ReviewCard";
import {Tab} from 'semantic-ui-react'
import ReplyCard from "../components/ReplyCard";
import update from 'immutability-helper';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: 1,
            isLoaded: false,
            allComplete: false,
        };
        this.handleReviewSelect = this.handleReviewSelect.bind(this);
        this.handleReviewReply = this.handleReviewReply.bind(this);
    }

    _renderReviews = (renderReviews) => {
        const reviews = renderReviews.map((review) => {
            return <DetailReviewCard key={review.id}
                                     id={review.id}
                                     selectedId={this.state.selectedId}
                                     author={review.author}
                                     title={review.title}
                                     date={review.created_date}
                                     isAggressive={review.is_aggressive}
                                     isReplied={review.is_replied}
                                     rating={review.rating}
                                     reply={review.reply}
                                     tag={review.tags[0] ? review.tags[0].name : "긍정"}
                                     content={review.content}
                                     onReviewSelect={this.handleReviewSelect}/>
        });

        return reviews;
    };

    _renderRepliedReviews = (isReplied) => {
        if (this.state.allComplete === true) {
            return "답변을 기다리는 리뷰가 없습니다!";
        }
        let reviews = this.state.reviews.filter((review) => review.is_replied === isReplied);
        return this._renderReviews(reviews);
    };

    _renderReplyCard = () => {
        const {id, author, title, content, date, isAggressive, isReplied, reply, rating} = this.state.replyCard;
        const tag = this.state.tag;

        return (
            <ReplyCard id={id}
                       author={author}
                       tag={tag}
                       title={title}
                       content={content}
                       date={date}
                       isAggressive={isAggressive}
                       isReplied={isReplied}
                       reply={reply}
                       rating={rating}
                       onReviewReply={this.handleReviewReply}/>
        );
    };

    _callReviewListApi = () => {
        return fetch('http://52.79.172.190:8080/reviews'
        )
            .then(response => response.json())
            .then(reviewList => reviewList)
            .catch(err => err);
    };

    _callReviewDetailApi = (id) => {
        const url = `http://52.79.172.190:8080/review/${id}`;
        return fetch(url)
            .then(response => response.json())
            .then(review => {
                return review;
            })
            .catch(err => err);
    };

    _getReviewList = async () => {
        const reviews = await this._callReviewListApi();
        this.setState({
            reviews
        });
    };

    //legacy
    _getReviewDetail = async () => {
        const review = await this._callReviewDetailApi(this.state.selectedId);
        const reviewTag = review.tags[0] ? review.tags[0].name : "긍정";
        this.setState({
            replyCard: {
                id: review.id,
                author: review.author,
                title: review.title,
                content: review.content,
                date: review.created_date,
                isAggressive: review.is_aggressive,
                isReplied: review.is_replied,
                reply: review.reply,
                rating: review.rating,
            },
            tag: reviewTag,
            isLoaded: true,
        });
    };

    handleReviewSelect = (review) => {
        this.setState({
            replyCard: {
                id: review.id,
                author: review.author,
                title: review.title,
                content: review.content,
                date: review.date,
                rating: review.rating,
                isAggressive: review.isAggressive,
                isReplied: review.isReplied,
                reply: review.reply,
            },
            tag: review.tag,
            selectedId: review.id
        });
    };

    handleReviewReply = (targetId, value) => {
        const targetIndex = this.state.reviews.findIndex((review) => review.id === targetId);
        const waitingReviews = this.state.reviews.filter(r => r.is_replied === false);
        const selectedIndex = waitingReviews.findIndex(r => r.id === targetId) + 1;

        if (waitingReviews.length <= 1) {
            this.setState({
                reviews: update(
                    this.state.reviews,
                    {
                        [targetIndex]: {
                            is_replied: {$set: true},
                            reply: {$set: value}
                        }
                    }),
                allComplete: true,
            });

            return;
        }


        const selectedReview = selectedIndex < waitingReviews.length ? waitingReviews[selectedIndex] : waitingReviews[0];
        const reviewTag = selectedReview.tags[0] ? selectedReview.tags[0].name : "긍정";

        this.setState({
            reviews: update(
                this.state.reviews,
                {
                    [targetIndex]: {
                        is_replied: {$set: true},
                        reply: {$set: value}
                    }
                }),
            tag: reviewTag,
            selectedId: selectedReview.id,
            replyCard: {
                id: selectedReview.id,
                author: selectedReview.author,
                title: selectedReview.title,
                content: selectedReview.content,
                date: selectedReview.created_date,
                rating: selectedReview.rating,
                isAggressive: selectedReview.is_aggressive,
                isReplied: selectedReview.is_replied,
                reply: selectedReview.reply,
            },
        });
    };

    render() {
        const {isLoaded} = this.state;
        const panes = [
            {
                menuItem: `답변대기`,
                render: () => {
                    return (
                        <div className="review_list_container">
                            {this.state.reviews ? this._renderRepliedReviews(false) : "리뷰를 가져오는 중입니다!"}
                        </div>
                    );
                },
            },
            {
                menuItem: `답변완료`,
                render: () => {
                    return (<div className="review_list_container">
                        {this.state.reviews ? this._renderRepliedReviews(true) : "리뷰를 가져오는 중입니다!"}
                    </div>);
                },
            },
        ];

        return (
            <div className="review_page_container">
                <Sidebar pageNum="1"></Sidebar>
                <div className="review_man_container">
                    <div className="review_reply">
                        <h2>Reply</h2>
                        {isLoaded ? this._renderReplyCard() : "리뷰를 가져오는 중입니다!"}
                    </div>
                    <div className="review_list">
                        <h2>Reviews</h2>
                        <Tab menu={{secondary: true}} panes={panes}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._getReviewList();
        this._getReviewDetail();
    }
}

export default Review;

