import React from 'react';
import './Template.css';
import Sidebar from "../components/Sidebar";
import TemplateCard from  "../components/TemplateCard";
import {Tab} from 'semantic-ui-react'
import {DetailReviewCard} from "../components/ReviewCard";
import TemplateCreator from "../components/TemplateCreator";


export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTemplatesLoaded : false,
        };
    }
    _callTemplateListApi = () => {
        return fetch('http://52.79.172.190:8080/templates'
        )
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(err => err);
    };

    _getTemplateList = async () => {
        const templates = await this._callTemplateListApi();
        this.setState({
            templates,
            isTemplatesLoaded: true
        });
    };

    _renderTemplateCard = () => {
        const templates = this.state.templates.map(t => {
            return <TemplateCard id={t.id}
                                 name={t.name}
                                 content={t.content}
                                 conditions={t.conditions}/>
        });

        return templates;
    };

    render() {
        const {isTemplatesLoaded} = this.state;

        const panes = [
            {
                menuItem: "템플릿",
                render: () => {
                    return (
                        <div className="review_list_container">
                            {isTemplatesLoaded?this._renderTemplateCard():"템플릿 목록을 가져오는 중 입니다!"}
                        </div>
                    );
                },
            },
        ];
        return(
            <div className="template_page_container">
                <Sidebar></Sidebar>
                <div className="review_man_container">
                    <div className="review_list">
                        <h2>Templates</h2>
                        <Tab menu={{secondary: true}} panes={panes}/>
                    </div>
                    <div className="template_creator_container">
                        <h2>Template Creator</h2>
                        <TemplateCreator/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._getTemplateList();
    }
}