import React from 'react';
import './ReplyCard.css';
import {Tag, BasicTag} from "./Tag";
import { Button } from 'semantic-ui-react'

const templates = {
    "긍정": "Thank you [name], We will keep doing our best :)",
    "부정": "Sorry [name], We will try more for better service.",
    "질문": "질문 템플릿",
    "제안": "제안 템플릿",
};

const tagList = ["긍정", "부정", "질문", "제안"];

export default class ReplyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewType: this.props.tag,
            value: templates[this.props.tag],
            isFiltered: this.props.isAggressive
        };

        this._loadTemplate = this._loadTemplate.bind(this);
        this._handleChange = this._handleChange.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }

    _handleChange = (e) => {
      this.setState({
          value: e.target.value
      });
    };

    _toggleFilter = (e) => {
        this.setState((prevState) => ({
            isFiltered: !prevState.isFiltered,
        }));
    };

     _loadTemplate = (e) => {
         e.preventDefault();

         this.setState({
             reviewType: e.target.value,
             value: templates[e.target.value],
         });
     };

     componentWillReceiveProps(nextProps, nextContext) {
         this.setState({
             reviewType: nextProps.tag,
             value: templates[nextProps.tag],
             isFiltered: nextProps.isAggressive
         });
     };

    _renderAggressiveInfo = () => {
        return (
            <div className="reply_card_info">
                <p>해당 리뷰는 공격적인 리뷰로 판단되어 필터링 되었습니다.</p>
                <div className="center_align">
                    <Button onClick={this._toggleFilter}>리뷰 보기</Button>
                </div>
            </div>
        );
    };

    render() {
        const {reviewType, isFiltered} = this.state;
        const {author, tag, title, content, isAggressive, isReplied, rating} = this.props;
        const date = this.props.date.split('T');
        const value = this.state.value.replace('[name]', author);
        const basicTagText = rating+"점";

        const ButtonGroup = () => (
            <Button.Group>
                {tagList.map((tag) => {
                    return <Button onClick={this._loadTemplate}
                                   value={tag}
                                   key={tagList.indexOf(tag)}
                                   className={reviewType === tag?"tag_button_active":""}>
                        {tag}</Button>
                })}
            </Button.Group>
        );

        return (
            <div className="reply_card_container">
                <div className="reply_card_review">
                    <div className="reply_card_title">
                        {author}
                        <div className="reply_card_subtitle">
                            Amazon Review / {isReplied?'답변완료':'답변대기'} ・ {date[0]}
                        </div>
                    </div>
                    <div className="tag_list">
                        <Tag name={tag}/>
                        <BasicTag text={basicTagText}/>
                    </div>
                    {isFiltered?this._renderAggressiveInfo():""}
                    <div className={isFiltered?"reply_card_desc filtered_review":"reply_card_desc"}>
                        <div className="reply_card_desc_title">
                            {title}
                        </div>
                        {content}
                    </div>
                </div>
                <form className="reply_card_editor">
                    <ButtonGroup/>
                    <textarea name="reply" value={value} onChange={this._handleChange}/>
                    <Button>답변</Button>
                </form>
            </div>
        );
    }
}