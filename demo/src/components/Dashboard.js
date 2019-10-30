import React from 'react';
import OverviewCard from "./OverviewCard";
import ReviewCard, {DetailReviewCard} from "./ReviewCard";
import './Dashboard.css';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: 1,
            isLoaded: false,
            allComplete: false,
        };
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
                                     tag={review.tags[0] ? review.tags[0].name : "중립"}
                                     content={review.content}
                                     onReviewSelect={this.handleReviewSelect}/>
        });

        return reviews;
    };

    _getDashboard = () => {
        return fetch('http://52.79.172.190:8080/dashboard')
            .then(res => {
                debugger;
                return res.json();
            })
            .then(json => {
                debugger;
                return json;
            })
            .then(err => err);
    };

    _getReviewList = async () => {
        const reviews = await this._callReviewListApi();
        this.setState({
            reviews,
            reviewCnt: reviews.length,
            replyCnt: 0,
        });
    };

    _callReviewListApi = () => {
        return fetch('http://52.79.172.190:8080/reviews'
        )
            .then(response => response.json())
            .then(reviewList => reviewList)
            .catch(err => err);
    };

    render() {
        const {reviews} = this.state;
        return (
            <div className="dashboard_container">
                <div className="dashboard_content_container">
                    <h2>New Reviews</h2>
                    "최신 리뷰를 가져오는 중입니다!"
                </div>
                <div className="dashboard_content_container">
                    <h2>Overview</h2>
                    <div className="row_align">
                        <OverviewCard/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._getReviewList();
        this._getDashboard();
    }
}

