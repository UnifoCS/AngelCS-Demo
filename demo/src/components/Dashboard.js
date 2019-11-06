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

    _callDashboardApi = () => {
        return fetch('http://52.79.172.190:8080/dashboard')
            .then(res => {
                return res.json();
            })
            .then(json => {
                return json;
            })
            .then(err => err);
    };

    _getDashboard = async () => {
        const data = await this._callDashboardApi();

        this.setState({
            countData: data[0].item,
            tagData: data[1].item,
            ratingData: data[2].item,
            newReviews: data[3].item,
            isLoaded: true,
        });
    };

    _renderReviews = (renderReviews) => {
        const reviews = renderReviews.map((review) => {
            return <DetailReviewCard key={review.id}
                                     id={review.id}
                                     selectedId={this.state.selectedId}
                                     author={review.author}
                                     content={review.content}
                                     date={review.created_date}
                                     isAggressive={review.is_aggressive}
                                     isReplied={review.is_replied}
                                     rating={review.rating}
                                     reply={review.reply}
                                     tag={review.tags[0] ? review.tags[0].name : "중립"}
                                     onReviewSelect={this.handleReviewSelect}/>
        });

        return reviews;
    };

    render() {
        const {countData, ratingData, tagData, newReviews, isLoaded} = this.state;

        return (
            <div className="dashboard_container">

                <div className="dashboard_content_container gray">
                    <div className="row_align">
                        {countData ? <OverviewCard countData={countData}
                                                   ratingData={ratingData}
                                                   tagData={tagData}/> : "Loading"}
                    </div>
                </div>

                <div className="dashboard_content_container gray right_side">
                    <h2>New Reviews</h2>
                    {isLoaded ? this._renderReviews(newReviews) : "새로운 리뷰를 가져오는 중 입니다!"}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._getDashboard();
    }
}

