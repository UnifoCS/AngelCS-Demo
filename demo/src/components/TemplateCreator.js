import React from 'react';
import './TemplateCreator.css';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
} from 'semantic-ui-react'

const ratingOptions = ['=', '>', '<'];
const scoreOptions = ['1점', '2점', '3점', '4점', '5점'];
const tagList = ["긍정", "부정", "문의"];

export default class TemplateCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagValue: '0',
            ratingValue: '=',
            scoreValue: '1',
        }
    }

    _handleTagChange = (e) => {
        this.setState({
            tagValue: e.target.value,
        })
    };

    _handleInputChange = e => {
        this.setState({
            titleValue: e.target.value,
        })
    };

    _handleScoreChange = (e) => {
        this.setState({
            scoreValue: e.target.value,
        })
    };

    _handleRatingChange = (e) => {
        this.setState({
            ratingValue: e.target.value,
        })
    };

    _handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    _createTemplate = (e) => {
        e.preventDefault();
        const {titleValue, tagValue, scoreValue, ratingValue, value} = this.state;
        fetch(`http://52.79.172.190:8080/templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue,
                content: value,
                conditions: {
                    tags: [Number(tagValue)],
                    ratings: ratingValue.concat(scoreValue)
                }
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                return json;
            })
            .catch(e => e);

        alert("템플릿이 추가되었습니다!");
    };

    render() {
        const {tagValue, ratingValue, scoreValue, value} = this.state;
        const ButtonGroup = () => (
            <Button.Group>
                {tagList.map((tag) => {
                    return <Button onClick={this._handleTagChange}
                                   value={tagList.indexOf(tag)}
                                   key={tagList.indexOf(tag)}
                                   className={tagValue == tagList.indexOf(tag) ? "tag_button_active" : ""}>
                        {tag}</Button>
                })}
            </Button.Group>
        );

        const RatingButtonGroup = () => (
            <Button.Group>
                {ratingOptions.map((r) => {
                    return <Button onClick={this._handleRatingChange}
                                   value={r}
                                   key={r}
                                   className={ratingValue === r ? "tag_button_active" : ""}>
                        {r}</Button>
                })}
            </Button.Group>
        );

        const ScoreButtonGroup = () => (
            <Button.Group>
                {scoreOptions.map((r) => {
                    return <Button onClick={this._handleScoreChange}
                                   value={r[0]}
                                   key={r[0]}
                                   className={scoreValue === r[0] ? "tag_button_active" : ""}>
                        {r}</Button>
                })}
            </Button.Group>
        );

        return (
            <div className="creator_container">
                <form>
                    <div className="reply_card_review">
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    label='템플릿 제목'
                                    placeholder='템플릿 제목'
                                    onChange={this._handleInputChange}
                                />
                            </Form.Group>
                            <ButtonGroup/>
                            <Form.Group>
                                <RatingButtonGroup/>
                                <ScoreButtonGroup/>
                            </Form.Group>
                        </Form>
                        <Form/>
                    </div>
                    <div className="reply_card_editor">
                        <div className="reply_editor">
                            <textarea name="reply" value={value} onChange={this._handleChange}/>
                        </div>
                        <div className="right_align">
                            <Button className="blue" onClick={this._createTemplate}>추가</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}