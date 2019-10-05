import React from 'react';
import './ReplyCard.css';
import {Tag, BasicTag} from "./Tag";
import { Button } from 'semantic-ui-react'

const templates = {
    "긍정": "긍정 템플릿",
    "부정": "부정 템플릿",
    "질문": "질문 템플릿",
    "제안": "제안 템플릿",
};

export default class ReplyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Seah Choi",
            reviewType: this.props.tag,
            value: templates[this.props.tag],
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

     _loadTemplate = (e) => {
         e.preventDefault();
         const reviewTypeValue = e.target.value;
         const templateContents = templates[e.target.value];

         this.setState({
             reviewType: reviewTypeValue,
             value: templateContents,
         });
     };

    render() {
        const {value} = this.state;
        const {tag} = this.props;
        const {author, title, content, isReplied, rating, template} = this.props.replyCard;
        const date = this.props.replyCard.date.split('T');
        const basicTagText = rating+"점";

        const ButtonGroup = () => (
            <Button.Group>
                <Button onClick={this._loadTemplate} value="긍정">긍정</Button>
                <Button onClick={this._loadTemplate} value="부정">부정</Button>
                <Button onClick={this._loadTemplate} value="질문">질문</Button>
                <Button onClick={this._loadTemplate} value="제안">제안</Button>
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
                    <div className="reply_card_desc">
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