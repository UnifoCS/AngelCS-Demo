import React from 'react';
import './OverviewCard.css';

export default function OverviewCard(title) {
    return (
        <div className="overview_card_container">
            <div className="overview_card_title">
                답변을 기다리고 있는 리뷰
            </div>
            <div className="overview_card_content">
                314
            </div>
        </div>
    );
}

