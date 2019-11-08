import React from 'react';
import {Tag, BasicTag} from './Tag';
import './ReviewCard.css';

export function ReviewCard(props) {
    const {author, id, selectedId, title, rating, isAggressive, isReplied, content} = props;
    const tagName = isAggressive? "부정" : props.tag;
    const date = props.date.split('T');
    const basicTagText = rating + "점";

    return (
        <a href="/review">
            <div
                className={id === selectedId ? "review_card_container detail_card review_card_active" : "review_card_container detail_card"}>
                <div className="review_card_title">
                    {author}
                    <div className="review_card_subtitle">
                        구글플레이스토어 / {isReplied ? '답변완료' : '답변대기'} ・ {date[0]}
                    </div>
                </div>
                <div className="tag_list">
                    <Tag name={tagName}/>
                    <BasicTag text={basicTagText}/>
                </div>
                <div className={isAggressive ? "review_card_desc aggressive_review_card" : "review_card_desc"}>
                    {content}
                </div>
            </div>
        </a>
    );
}

export class DetailReviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleReviewClick = this.handleReviewClick.bind(this);
        this.state = {
            cardSelected: false,
        }
    }

    handleReviewClick = (e) => {
        this.props.onReviewSelect(this.props);
    };

    render() {
        const {author, id, selectedId, title, rating, isAggressive, isReplied, tag, content} = this.props;
        const date = this.props.date.split('T');
        const basicTagText = rating + "점";

        return (
            <div
                className={id === selectedId ? "review_card_container detail_card review_card_active" : "review_card_container detail_card"}
                onClick={this.handleReviewClick}>
                <div className="review_card_title">
                    {author}
                    <div className="review_card_subtitle">
                        구글플레이스토어 / {isReplied ? '답변완료' : '답변대기'} ・ {date[0]}
                    </div>
                </div>
                <div className="tag_list">
                    <Tag name={tag}/>
                    <BasicTag text={basicTagText}/>
                </div>
                <div className={isAggressive ? "review_card_desc aggressive_review_card" : "review_card_desc"}>
                    {content}
                </div>
            </div>
        );
    }
}

