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

    _updateTemplate = (e) => {
        const {value} = this.state;
        fetch(`http://52.79.172.190:8080/template/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.props.name,
                content: value,
                conditions: this.props.conditions
            })
        })
            .then(res => res.json())
            .then(json => {
                return json;
            })
            .catch(e => e);

        alert("수정된 리뷰가 추가되었습니다.");
    };

    _deleteTemplate = (e) => {
        e.preventDefault();
        fetch(`http://52.79.172.190:8080/template/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                return json;
            })
            .catch(e => e);
        alert("삭제되었습니다.");
    };


    render() {
        console.log(this.props);
        const {value} = this.state;
        const {name, id, conditions} = this.props;
        const ratingCondition = conditions[0]?`${conditions[0].operand1} ${conditions[0].operator} ${conditions[0].operand2}`:"";
        const tagCondition = conditions[1]?tagList[conditions[1].operand2]:"";

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
                        <Button className="blue" onClick={this._updateTemplate}>수정</Button>
                        <Button className="blue" onClick={this._deleteTemplate}>삭제</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TemplateCard;