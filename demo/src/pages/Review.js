import React from 'react';
import './Review.css';
import Sidebar from "../components/Sidebar";
import {DetailReviewCard} from "../components/ReviewCard";
import {Tab} from 'semantic-ui-react'
import ReplyCard from "../components/ReplyCard";

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: "긍정",
            selectedId: 1,
        };
        this.handleReviewSelect = this.handleReviewSelect.bind(this);
    }

    handleReviewSelect = (tag, id) => {
        this.setState({
            tag: tag,
            selectedId: id,
        });
    };

    _renderReviews = () => {
        const reviews = this.state.reviews.map((review) => {
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
                                     tag={review.tags[0]?review.tags[0].name:"긍정"}
                                     content={review.content}
                                     onReviewSelect={this.handleReviewSelect}/>
        });

        return reviews;
    };

    _callReviewListApi = () => {
        return fetch('http://52.79.172.190:8080/reviews'
        )
            .then(response => response.json())
            .then(reviewList => reviewList)
            .catch(err => console.log('err!'));
    };

    _getReviewList = async () => {
        const reviews = await this._callReviewListApi();
        this.setState({
            reviews
        });
    };

    render() {
        const tag = this.state.tag;
        const panes = [
            {
                menuItem: '답변대기 (30건)',
                render: () => {
                    return (<div className="review_list_container">
                        {this.state.reviews ? this._renderReviews() : "리뷰를 가져오는 중입니다!"}
                    </div>);
                },
            },
            {
                menuItem: '답변완료 (50건)',
                render: () => {
                    return (<div className="review_list_container">
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
                        <ReplyCard tag={tag}></ReplyCard>
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
    }
}

export default Review;

