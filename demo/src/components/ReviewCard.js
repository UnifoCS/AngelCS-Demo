import React from 'react';
import {Tag, BasicTag} from './Tag';
import './ReviewCard.css';

export default function ReviewCard(tag) {
    const tagName = tag.tag;
    return (
        <div className="review_card_container">
            <div className="review_card_title">
                Seah Choi
                <div className="review_card_subtitle">
                    Amazon Review / 3점 ・ 답변대기
                </div>
            </div>
            <Tag name={tagName}/>
            <div className="review_card_desc">
                현재 130레벨까지 키운 유저입니다. 우선 아기자기하고 나름 중독성있는 괜찮은 게임이라 생각됩니다. 다만 아쉬운점 몇가지만 끄적여보겠습니다.
                우선 등급업에 대한 광고시청은 너무 과하다생각됩니다. 등급업만이라도 광고대신 골드로 대체가 되어야될거같습니다 광고가 너무 많아요.
                둘째 컨텐츠 부족, 닭장에 닭들을 피버시키는 알바라든지 컨베이어벨트 가속화정도가 추가되었으면합니다.
                게임 자체는 귀엽고, 킬링타임용으로도 훌륭하다고 생각됩니다.
            </div>
        </div>
    );
}

export class DetailReviewCard extends React.Component{
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
        const basicTagText = rating+"점";

        return (
            <div className={id===selectedId?"review_card_container detail_card review_card_active":"review_card_container detail_card"} onClick={this.handleReviewClick}>
                <div className="review_card_title">
                    {author}
                    <div className="review_card_subtitle">
                        구글플레이스토어 / {isReplied?'답변완료':'답변대기'} ・ {date[0]}
                   </div>
                </div>
                <div className="tag_list">
                    <Tag name={tag}/>
                    <BasicTag text={basicTagText}/>
                </div>
                <div className={isAggressive?"review_card_desc aggressive_review_card":"review_card_desc"}>
                    {content}
                </div>
            </div>
        );
    }
}

