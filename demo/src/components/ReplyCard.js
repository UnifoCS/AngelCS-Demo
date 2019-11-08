import React from 'react';
import './ReplyCard.css';
import {Tag, BasicTag} from "./Tag";
import { Button } from 'semantic-ui-react'

const templates = {
    "긍정": "[name]님 감사합니다.\n" +
        "앞으로도 좋은 서비스 이어나가겠습니다.",
    "부정": "[name]님 안녕하세요.\n" +
        "서비스의 불만족스러운 부분을 개선하기위해 노력하겠습니다. 별점도 5점 주시면 저희가 개발하는데 힘이 날 것 같습니다.\n" +
        "감사합니다.",
    "문의": "[name]님 안녕하세요.\n" +"문의해주신 내용 접수하였습니다.",
    "중립": "[name]님 안녕하세요.\n" +
        "소중한 리뷰 감사합니다.",
    "공격": "[name]님 안녕하세요.\n" +
        "서비스의 불만족스러운 부분을 개선하기위해 노력하겠습니다. 별점도 5점 주시면 저희가 개발하는데 힘이 날 것 같습니다.\n" +
        "감사합니다.",
};

const tagList = ["긍정", "부정", "공격", "문의", "중립"];

export default class ReplyCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviewType: this.props.tag,
            value: this.props.recomTem.replace('[name]', this.props.author),
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
             value: templates[e.target.value].replace('[name]', this.props.author),
         });
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

     async componentWillReceiveProps(nextProps, nextContext) {
         const reviewDetail = await this._callReviewDetailApi(nextProps.id);
         debugger;
         this.setState({
             reviewType: nextProps.tag,
             value: nextProps.isReplied?nextProps.reply:reviewDetail.recommended_templates[0].content.replace('[name]', nextProps.author),
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
        const {author, tag, title, content, isAggressive, isReplied, reply, rating, recomTem} = this.props;
        const date = this.props.date.split('T');
        const value = this.state.value;
        const basicTagText = rating+"점";

        const ButtonGroup = () => (
            <Button.Group>
                {tagList.map((tag) => {
                    return <Button onClick={this._loadTemplate}
                                   value={tag}
                                   key={tagList.indexOf(tag)}
                                   className={reviewType === tag?"tag_button_active":""}>
                        {tag}</Button>
                })}\
            </Button.Group>
        );

        return (
            <div className="reply_card_container">
                <div className="reply_card_review">
                    <div className="reply_card_title">
                        {author}
                        <div className="reply_card_subtitle">
                            구글플레이스토어 / {isReplied?'답변완료':'답변대기'} ・ {date[0]}
                        </div>
                    </div>
                    <div className="tag_list">
                        <Tag name={tag}/>
                        <BasicTag text={basicTagText}/>
                    </div>
                    {isFiltered?this._renderAggressiveInfo():""}
                    <div className={isFiltered?"reply_card_desc filtered_review":"reply_card_desc"}>
                        {content}
                    </div>
                </div>
                <div className="reply_card_editor" >
                    <ButtonGroup/>
                    <div className="reply_editor">
                        <textarea name="reply" value={value} onChange={this._handleChange}/>
                    </div>
                    <div className="right_align">
                        <Button onClick={()=>{this.props.onReviewReply(this.props.id, value);}} className="blue">답변</Button>
                    </div>
                </div>
            </div>
        );
    }
}