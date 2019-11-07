import React from 'react';
import './OverviewCard.css';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryArea, VictoryPolarAxis} from 'victory';

let countData = [
    {rating: 1,},
    {rating: 2,},
    {rating: 3,},
    {rating: 4,},
    {rating: 5,},
];

export default class OverviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const reviewTotal = this.props.countData.review_total_count;
        const reviewReplied = this.props.countData.review_replied_count;

        const ratingCountData = countData.map(d => {
            const ratingObj = {
                rating: d.rating,
                count: this.props.ratingData[d.rating]
            };

            return ratingObj;
        });

        const tagData = this.props.tagData.map(d => {
            const tagObj = {
                x: d.name,
                y: d.count,
            };

            return tagObj;
        });

        debugger;

        return (
            <div className="overview_container">
                <div className="overview_card_container">
                    <div className="overview_card_title">
                        {reviewTotal}개 리뷰 중 {reviewTotal-reviewReplied}개의 답변이 완료되었습니다.
                        ({Math.floor(((reviewTotal-reviewReplied)/reviewTotal)*100)}%)
                    </div>
                </div>
                <div className="row">
                    <div className="overview_card_container">
                        <div className="overview_card_title">
                            평가 점수 별 리뷰 수
                        </div>
                        <div className="overview_card_content">
                            <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
                                <VictoryAxis
                                    // tickValues specifies both the number of ticks and where
                                    // they are placed on the axis
                                    tickValues={[1, 2, 3, 4, 5]}
                                    tickFormat={["1점", "2점", "3점", "4점", "5점"]}
                                />
                                <VictoryAxis
                                    dependentAxis
                                    // tickFormat specifies how ticks should be displayed
                                    tickFormat={(x) => (`${x}개`)}
                                />
                                <VictoryBar cornerRadius={{topLeft: 12}}
                                            labels={({datum}) => `${datum.count}`}
                                            style={{
                                                data: {
                                                    fill: "#8D95FF",
                                                    width: 25
                                                }
                                            }}
                                            data={ratingCountData}
                                            x="rating"
                                            y="count"/>
                            </VictoryChart>
                        </div>
                    </div>
                    <div className="overview_card_container">
                        <div className="overview_card_content">
                            <VictoryChart polar theme={VictoryTheme.material}>
                                <VictoryArea data={ratingCountData}
                                             x="rating"
                                             y="count"/>
                                <VictoryPolarAxis/>
                            </VictoryChart>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="overview_card_container">
                        <div className="overview_card_title">
                            태그 별 리뷰 수
                        </div>
                        <div className="overview_card_content">
                            <VictoryPie
                                labels={({datum}) => `${datum.x} : ${datum.y}개`}
                                labelRadius={66}
                                style={{ labels: { fill: "white", fontSize: 18} }}
                                data={tagData} />
                        </div>
                    </div>
                    <div className="overview_card_container">
                        <div className="overview_card_content">
                            <VictoryChart polar theme={VictoryTheme.material}>
                                <VictoryArea data={tagData}/>
                                <VictoryPolarAxis/>
                            </VictoryChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

