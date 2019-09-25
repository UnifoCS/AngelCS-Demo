import React from 'react';
import './Tag.css';

const tagColor = {
    "긍정": "#45D582",
    "부정": "#FF3838",
    "질문": "#F8A32E",
};

export default function Tag(props) {
    const name = props.name;
    const color = tagColor[props.name];
    const colorStyle= {
        backgroundColor: {color}.color,
    };

    return (
        <div className="tag_container" style={colorStyle}>
            {name}
        </div>
    );
}

