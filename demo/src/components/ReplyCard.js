import React from 'react';
import './ReplyCard.css';
import Tag from "./Tag";
import { Button } from 'semantic-ui-react'

const templates = {
    "긍정": "긍정 템플릿",
    "부정": "부정 템플릿",
    "질문": "질문 템플릿",
};

export default class ReplyCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "Seah Choi",

            reviewType: this.props.type,
            value: templates[this.props.type],
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
        const ButtonGroup = () => (
            <Button.Group>
                <Button onClick={this._loadTemplate} value="긍정">긍정</Button>
                <Button onClick={this._loadTemplate} value="부정">부정</Button>
                <Button onClick={this._loadTemplate} value="질문">질문</Button>
            </Button.Group>
        );

        const {userName, value} = this.state;
        return (
            <div className="reply_card_container">
                <div className="reply_card_review">
                    <div className="reply_card_title">
                        {userName}
                        <div className="reply_card_subtitle">
                            구글플레이스토어 / 3점 ・ 답변대기
                        </div>
                    </div>
                    <Tag name="긍정"/>
                    <div className="reply_card_desc">
                        현재 130레벨까지 키운 유저입니다. 우선 아기자기하고 나름 중독성있는 괜찮은 게임이라 생각됩니다. 다만 아쉬운점 몇가지만 끄적여보겠습니다.
                        우선 등급업에 대한 광고시청은 너무 과하다생각됩니다. 등급업만이라도 광고대신 골드로 대체가 되어야될거같습니다 광고가 너무 많아요.
                        둘째 컨텐츠 부족, 닭장에 닭들을 피버시키는 알바라든지 컨베이어벨트 가속화정도가 추가되었으면합니다.
                        게임 자체는 귀엽고, 킬링타임용으로도 훌륭하다고 생각됩니다.
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