import React from 'react';
import './TemplateCard.css';
import {Button} from "semantic-ui-react";
import {Tag, BasicLongTag} from "./Tag";

const tagList = [
    "긍정",
    "부정",
    "질문",
    "중립"
];


class TemplateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.content,
        };
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };


    render() {
        const {value} = this.state;
        const {name, id, content, conditions} = this.props;
        const ratingCondition = `${conditions[0].operand1} ${conditions[0].operator} ${conditions[0].operand2}`;
        const tagCondition = tagList[conditions[1].operand2];
        return (
            <div className="template_card_container">
                <div className="template_card_title">
                    {name}
                </div>
                <div className="tag_list">
                    <Tag name={tagCondition}/>
                    <BasicLongTag text={ratingCondition}/>
                </div>
                <div className="template_card_editor">
                    <div className="reply_editor">
                        <textarea name="reply" value={value} onChange={this._handleChange}/>
                    </div>
                    <div className="right_align">
                        <Button className="blue">수정</Button>
                        <Button className="blue">삭제</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TemplateCard;